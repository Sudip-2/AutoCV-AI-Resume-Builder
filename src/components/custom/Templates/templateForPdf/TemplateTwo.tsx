import { resumeValues } from "@/lib/validation";
import {
  Document,
  Page,
  Text,
  View,
  Image as PDFImage,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";

interface ResumeTemplateProps {
  resumeData: resumeValues;
}

const formatLink = (link: string) => {
  if (!link) return "";
  return link.includes("https://") ? link : `https://${link}`;
};

export default function TemplateTwo({ resumeData }: ResumeTemplateProps) {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      fontSize: 12,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 8, // corresponds to space-y-6 in Tailwind
    },
    sectionWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 12, // corresponds to space-y-8 in Tailwind
    },
    section: {
      marginBottom: 6,
      paddingTop: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "semibold",
      marginBottom: 6,
      color: resumeData.colorHex || "#000000",
    },
    sectionContent: {
      display: "flex",
      flexDirection: "column",
      gap: 4, // corresponds to space-y-2 in Tailwind
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 10,
      textAlign: "center",
      gap: 6,
    },
    separator: {
      height: 2,
      backgroundColor: "#e5e7eb", // border-gray-200 equivalent
      width: "100%",
      marginVertical: 8,
    },
    profileImage: {
      width: 80,
      height: 80,
      objectFit: "cover",
      borderRadius:
        resumeData.borderStyle === BorderStyles.SQUARE
          ? 0
          : resumeData.borderStyle === BorderStyles.CIRCLE
            ? 40
            : 12,
      alignSelf: "center",
    },
    headerInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: "medium",
      color: "#4B5563", // text-gray-600
      textAlign: "center",
    },
    contactInfo: {
      fontSize: 10,
      color: "#6B7280", // text-gray-500
      textAlign: "center",
    },
    linksContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
    },
    link: {
      fontSize: 10,
      color: "#6B7280", // text-gray-500
      textDecoration: "none",
    },
    expItem: {
      marginBottom: 4,
      marginTop: 2,
    },
    itemHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 12,
      fontWeight: "semibold",
      color: "#1F2937", // text-gray-800
    },
    itemSubHeader: {
      fontSize: 10,
      fontWeight: "semibold",
      color: "#4B5563", // text-gray-600
    },
    description: {
      fontSize: 10,
      color: "#374151", // text-gray-700
      lineHeight: 1.3,
      marginTop: 2,
    },
    skillsText: {
      fontSize: 12,
      marginTop: 2,
    },
    breakInsideAvoid: {
      // For PDF this is handled with the wrap property in render
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Header resumeData={resumeData} styles={styles} />
          <View style={styles.sectionWrapper}>
            <SummarySection resumeData={resumeData} styles={styles} />
            <WorkExperienceSection resumeData={resumeData} styles={styles} />
            <ProjectsSection resumeData={resumeData} styles={styles} />
            <EducationSection resumeData={resumeData} styles={styles} />
            <SkillsSection resumeData={resumeData} styles={styles} />
            <ActivitiesSection resumeData={resumeData} styles={styles} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

interface ResumeSectionProps {
  resumeData: resumeValues;
  styles: any;
}

function Header({ resumeData, styles }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    github,
    linkedin,
    city,
    country,
  } = resumeData;

  return (
    <View style={styles.headerContainer}>
      {photo && (
        <PDFImage
          src={photo instanceof File ? URL.createObjectURL(photo) : photo}
          style={styles.profileImage}
        />
      )}
      <View style={styles.headerInfo}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.contactInfo}>
          {[city, country].filter(Boolean).join(", ")}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </Text>
        <View style={styles.linksContainer}>
          {linkedin && (
            <Link src={formatLink(linkedin)}>
              <Text style={styles.link}>{linkedin}</Text>
            </Link>
          )}
          {linkedin && github && (
            <Text style={styles.contactInfo}> | </Text>
          )}
          {github && (
            <Link src={formatLink(github)}>
              <Text style={styles.link}>{github}</Text>
            </Link>
          )}
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

function SummarySection({ resumeData, styles }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <View style={styles.section} wrap={false}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Professional Summary
      </Text>
      <View style={styles.sectionContent}>
        <Text style={styles.description}>{summary}</Text>
      </View>
    </View>
  );
}

function WorkExperienceSection({ resumeData, styles }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;

  const valid = workExperience?.filter((exp) =>
    Object.values(exp).some(Boolean)
  );

  if (!valid?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Work Experience
      </Text>
      <View style={styles.sectionContent}>
        {valid.map((exp, i) => (
          <View key={`work-${i}`} style={styles.expItem} wrap={false}>
            <View style={styles.itemHeader}>
              <Text>{exp.position}</Text>
              {exp.startDate && (
                <Text>
                  {formatDate(exp.startDate, "yyyy-MM-dd")} –{" "}
                  {exp.endDate
                    ? formatDate(exp.endDate, "yyyy-MM-dd")
                    : "Present"}
                </Text>
              )}
            </View>
            <Text style={styles.itemSubHeader}>{exp.company}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ProjectsSection({ resumeData, styles }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const valid = projects?.filter((proj) => Object.values(proj).some(Boolean));

  if (!valid?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Projects
      </Text>
      <View style={styles.sectionContent}>
        {valid.map((proj, i) => (
          <View key={`project-${i}`} style={styles.expItem} wrap={false}>
            <View style={styles.itemHeader}>
              <Text>{proj.name}</Text>
              {proj.startDate && (
                <Text>
                  {formatDate(proj.startDate, "yyyy-MM-dd")} –{" "}
                  {proj.endDate
                    ? formatDate(proj.endDate, "yyyy-MM-dd")
                    : "Present"}
                </Text>
              )}
            </View>
            
            {proj.gitHubLink && (
              <View>
                <Text style={styles.itemSubHeader}>
                  Github:{" "}
                  <Link src={formatLink(proj.gitHubLink)}>
                    <Text style={{fontSize: 10, textDecoration: "underline", color: "#4B5563"}}>{proj.gitHubLink}</Text>
                  </Link>
                </Text>
              </View>
            )}
            
            {proj.liveLink && (
              <View>
                <Text style={styles.itemSubHeader}>
                  Live url:{" "}
                  <Link src={formatLink(proj.liveLink)}>
                    <Text style={{fontSize: 10, textDecoration: "underline", color: "#4B5563"}}>{proj.liveLink}</Text>
                  </Link>
                </Text>
              </View>
            )}

            <Text style={{...styles.description, marginTop: 4}}>{proj.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function EducationSection({ resumeData, styles }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;

  const valid = education?.filter((edu) => Object.values(edu).some(Boolean));

  if (!valid?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Education
      </Text>
      <View style={styles.sectionContent}>
        {valid.map((edu, i) => (
          <View key={`education-${i}`} style={styles.expItem} wrap={false}>
            <View style={styles.itemHeader}>
              <Text>{edu.degree}</Text>
              {edu.startDate && (
                <Text>
                  {formatDate(edu.startDate, "yyyy-MM-dd")} –{" "}
                  {edu.endDate
                    ? formatDate(edu.endDate, "yyyy-MM-dd")
                    : "Present"}
                </Text>
              )}
            </View>
            <Text style={styles.itemSubHeader}>{edu.school}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SkillsSection({ resumeData, styles }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;

  if (!skills?.length) return null;

  return (
    <View style={styles.section} wrap={false}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Skills
      </Text>
      <Text style={styles.skillsText}>{skills.join(", ")}</Text>
    </View>
  );
}

function ActivitiesSection({ resumeData, styles }: ResumeSectionProps) {
  const { activites, colorHex } = resumeData;

  const valid = activites?.filter((act) => Object.values(act).some(Boolean));

  if (!valid?.length) return null;

  return (
    <View style={styles.section} wrap={false}>
      <Text style={{...styles.sectionTitle, color: colorHex || "#000000"}}>
        Activities
      </Text>
      <View style={styles.sectionContent}>
        {valid.map((act, i) => (
          <View key={`activity-${i}`} style={styles.expItem} wrap={false}>
            <View style={styles.itemHeader}>
              <Text>{act.name}</Text>
              {act.startDate && (
                <Text>
                  {formatDate(act.startDate, "yyyy-MM-dd")}
                  {act.endDate
                    ? ` – ${formatDate(act.endDate, "yyyy-MM-dd")}`
                    : ""}
                </Text>
              )}
            </View>
            {act.certLink && (
              <Link src={formatLink(act.certLink)}>
                <Text style={{fontSize: 10, fontWeight: "semibold", textDecoration: "underline", color: "#4B5563"}}>
                  {act.certLink}
                </Text>
              </Link>
            )}
            <Text style={styles.description}>{act.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
