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

export default function TemplateOne({ resumeData }: ResumeTemplateProps) {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      fontSize: 12,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    section: {
      marginBottom: 2,
      paddingTop: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 3,
      marginBottom: 4,
      color: resumeData.colorHex || "#000000",
    },
    separator: {
      height: 1,
      backgroundColor: "#e5e7eb", // bg-gray-200 equivalent
      marginTop: 5,
      marginBottom: 12,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      marginBottom: 12,
    },
    headerInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
    },
    jobTitle: {
      fontSize: 14,
      marginBottom: 4,
      fontWeight: "medium",
    },
    contactInfo: {
      fontSize: 10,
      color: "gray",
    },
    linksContainer: {
      display: "flex",
      flexDirection: "row",
    },
    profileImage: {
      width: 100,
      height: 100,
      objectFit: "cover",
      borderRadius:
        resumeData.borderStyle === BorderStyles.SQUARE
          ? 0
          : resumeData.borderStyle === BorderStyles.CIRCLE
            ? 50
            : 10,
    },
    content: {
      fontSize: 10,
    },
    expItem: {
      marginBottom: 2,
      paddingBottom: 1,
      marginTop: 3,
    },
    itemHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 2,
    },
    itemSubHeader: {
      fontSize: 10,
      fontWeight: "bold",
      marginBottom: 1,
      marginTop: 1,
    },
    description: {
      fontSize: 9,
      marginTop: 3,
      lineHeight: 1.3,
    },
    linkText: {
      fontSize: 9,
      color: "#333333",
      textDecoration: "underline",
    },
    skillsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillBadge: {
      backgroundColor: resumeData.colorHex || "#000000",
      color: "white",
      padding: "2 6",
      fontSize: 9,
      borderRadius:
        resumeData.borderStyle === BorderStyles.SQUARE
          ? 0
          : resumeData.borderStyle === BorderStyles.CIRCLE
            ? 15
            : 8,
      marginRight: 4,
      marginBottom: 2,
      minWidth: 40,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <PersonalInfoHeader resumeData={resumeData} styles={styles} />
          <SummarySection resumeData={resumeData} styles={styles} />
          <WorkExperienceSection resumeData={resumeData} styles={styles} />
          <EducationSection resumeData={resumeData} styles={styles} />
          <ProjectSection resumeData={resumeData} styles={styles} />
          <SkillsSection resumeData={resumeData} styles={styles} />
          <ActivitySection resumeData={resumeData} styles={styles} />
        </View>
      </Page>
    </Document>
  );
}

interface ResumeSectionProps {
  resumeData: resumeValues;
  styles: any;
}

function PersonalInfoHeader({ resumeData, styles }: ResumeSectionProps) {
  const {
    city,
    country,
    email,
    firstName,
    jobTitle,
    lastName,
    phone,
    photo,
    github,
    linkedin,
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
        <View>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.jobTitle}>{jobTitle}</Text>
        </View>
        <Text style={styles.contactInfo}>
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </Text>
        <View style={styles.linksContainer}>
          <Text style={styles.contactInfo}>
            {linkedin && (
              <Link src={formatLink(linkedin)}>
                <Text style={styles.contactInfo}>{linkedin}</Text>
              </Link>
            )}
            {linkedin && github ? " | " : ""}
            {github && (
              <Link src={formatLink(github)}>
                <Text style={styles.contactInfo}>{github}</Text>
              </Link>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

function SummarySection({ resumeData, styles }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <View style={styles.section}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Professional profile</Text>
      <Text style={styles.content}>{summary}</Text>
    </View>
  );
}

function WorkExperienceSection({ resumeData, styles }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;

  const workExperienceIsNotEmpty = workExperience?.filter(
    (exp) => Object.values(exp)?.filter(Boolean).length > 0
  );

  if (!workExperienceIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Work experience</Text>
      {workExperienceIsNotEmpty.map((exp, index) => (
        <View key={`work-${index}`} style={styles.expItem} wrap={false}>
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
  );
}

function ProjectSection({ resumeData, styles }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectIsNotEmpty = projects?.filter(
    (proj) => Object.values(proj)?.filter(Boolean).length > 0
  );

  if (!projectIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Project</Text>
      {projectIsNotEmpty.map((proj, index) => (
        <View key={`project-${index}`} style={styles.expItem} wrap={false}>
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
                GitHub:{" "}
                <Link src={formatLink(proj.gitHubLink)}>
                  <Text style={{...styles.linkText, color: "#333333"}}>{proj.gitHubLink}</Text>
                </Link>
              </Text>
            </View>
          )}
          
          {proj.liveLink && (
            <View>
              <Text style={styles.itemSubHeader}>
                Live URL:{" "}
                <Link src={formatLink(proj.liveLink)}>
                  <Text style={{...styles.linkText, color: "#333333"}}>{proj.liveLink}</Text>
                </Link>
              </Text>
            </View>
          )}

          <Text style={{...styles.description, marginTop: 6}}>{proj.description}</Text>
        </View>
      ))}
    </View>
  );
}

function EducationSection({ resumeData, styles }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;

  const educationIsNotEmpty = education?.filter(
    (edu) => Object.values(edu)?.filter(Boolean).length > 0
  );

  if (!educationIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Education</Text>
      {educationIsNotEmpty.map((edu, index) => (
        <View key={`education-${index}`} style={styles.expItem} wrap={false}>
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
  );
}

function SkillsSection({ resumeData, styles }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <View style={styles.section} wrap={false}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={`skill-${index}`} style={styles.skillBadge}>
            <Text style={{ color: "white", fontSize: 9, textAlign: "center" }}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ActivitySection({ resumeData, styles }: ResumeSectionProps) {
  const { activites, colorHex } = resumeData;

  const activityIsNotEmpty = activites?.filter(
    (act) => Object.values(act)?.filter(Boolean).length > 0
  );

  if (!activityIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Activities</Text>
      {activityIsNotEmpty.map((act, index) => (
        <View key={`activity-${index}`} style={styles.expItem} wrap={false}>
          <View style={styles.itemHeader}>
            <Text>{act.name}</Text>
            {act.startDate && (
              <Text>
                {formatDate(act.startDate, "yyyy-MM-dd")}
                {act.endDate
                  ? `${" – "}${formatDate(act.endDate, "yyyy-MM-dd")}`
                  : ""}
              </Text>
            )}
          </View>
          {act.certLink && (
            <Link src={formatLink(act.certLink)}>
              <Text style={{...styles.itemSubHeader, ...styles.linkText, color: "#333333"}}>
                {act.certLink}
              </Text>
            </Link>
          )}
          <Text style={styles.description}>{act.description}</Text>
        </View>
      ))}
    </View>
  );
}
