import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { resumeValues } from "@/lib/validation";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";

// --- Helper Functions ---
const formatLink = (link: string) => {
  if (!link) return "";
  return link.includes("https://") ? link : `https://${link}`;
};

// --- Interfaces ---
interface ResumeTemplateProps {
  resumeData: resumeValues;
}

interface ResumeSectionProps {
  resumeData: resumeValues;
}

// --- Main PDF Document Component ---
export default function DefaultPdf({ resumeData }: ResumeTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <PersonalInfoHeader resumeData={resumeData} />
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
          <ProjectSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
          <ActivitySection resumeData={resumeData} />
        </View>
      </Page>
    </Document>
  );
}

// --- PDF Section Components ---

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    city,
    country,
    email,
    firstName,
    jobTitle,
    lastName,
    phone,
    photo,
    borderStyle,
    github,
    linkedin,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  const isCentered = !photoSrc;

  const photoStyle = {
    borderRadius:
      borderStyle === BorderStyles.SQUARE
        ? 0
        : borderStyle === BorderStyles.CIRCLE
          ? 50
          : 10,
  };

  return (
    <View style={styles.personalInfoContainer}>
      {photoSrc && <Image src={photoSrc} style={[styles.photo, photoStyle]} />}
      <View
        style={
          isCentered
            ? styles.personalInfoTextContainerCentered
            : styles.personalInfoTextContainer
        }
      >
        <View style={styles.spaceY1}>
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
        <View
          style={[
            styles.contactLinksContainer,
            // Corrected conditional style to prevent type error
            isCentered ? styles.contactLinksContainerCentered : {},
          ]}
        >
          <Link src={formatLink(linkedin || "")} style={styles.link}>
            {linkedin}
          </Link>
          {/* Corrected to render a Text component to avoid invalid children */}
          {linkedin && github ? (
            <Text style={styles.linkSeparator}> | </Text>
          ) : (
            <Text></Text>
          )}
          <Link src={formatLink(github || "")} style={styles.link}>
            {github}
          </Link>
        </View>
      </View>
    </View>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    // The `break` prop is removed from the main section container
    <View style={styles.section}>
      {/* minPresenceAhead ensures the heading doesn't get left alone */}
      <View style={styles.sectionTitleContainer} minPresenceAhead={20}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Summary
        </Text>
      </View>
      <Text style={styles.summaryContent}>{summary}</Text>
    </View>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;
  const workExperienceIsNotEmpty = workExperience?.filter(
    (exp) => Object.values(exp)?.filter(Boolean).length > 0
  );

  if (!workExperienceIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer} minPresenceAhead={40}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Work Experience
        </Text>
      </View>
      {workExperienceIsNotEmpty.map((exp, index) => (
        // The `break` prop is kept on individual items to prevent them from splitting
        <View key={index} style={styles.entryContainer} break>
          <View style={styles.entryHeader}>
            <Text style={styles.companyName}>{exp.company}</Text>
            {exp.startDate && (
              <Text style={styles.dateText}>
                {formatDate(exp.startDate, "yyyy-MM-dd")} –{" "}
                {exp.endDate
                  ? formatDate(exp.endDate, "yyyy-MM-dd")
                  : "Present"}
              </Text>
            )}
          </View>
          <Text style={styles.position}>{exp.position}</Text>
          <Text style={styles.description}>{exp.description}</Text>
        </View>
      ))}
    </View>
  );
}

function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;
  const projectIsNotEmpty = projects?.filter(
    (proj) => Object.values(proj)?.filter(Boolean).length > 0
  );

  if (!projectIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer} minPresenceAhead={40}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Projects
        </Text>
      </View>
      {projectIsNotEmpty.map((proj, index) => (
        <View key={index} style={styles.entryContainer} break>
          <View style={styles.entryHeader}>
            <Text style={[styles.projectName, { color: colorHex }]}>
              {proj.name}
            </Text>
            {proj.startDate && (
              <Text style={styles.dateText}>
                {formatDate(proj.startDate, "yyyy-MM-dd")} –{" "}
                {proj.endDate
                  ? formatDate(proj.endDate, "yyyy-MM-dd")
                  : "Present"}
              </Text>
            )}
          </View>
          {proj.gitHubLink && (
            <Text style={styles.projectLinkText}>
              Github:{" "}
              <Link src={formatLink(proj.gitHubLink)} style={styles.link}>
                {proj.gitHubLink}
              </Link>
            </Text>
          )}
          {proj.liveLink && (
            <Text style={styles.projectLinkText}>
              Live URL:{" "}
              <Link src={formatLink(proj.liveLink)} style={styles.link}>
                {proj.liveLink}
              </Link>
            </Text>
          )}
          <Text style={styles.projectDescription}>{proj.description}</Text>
        </View>
      ))}
    </View>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;
  const educationIsNotEmpty = education?.filter(
    (edu) => Object.values(edu)?.filter(Boolean).length > 0
  );

  if (!educationIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer} minPresenceAhead={30}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Education
        </Text>
      </View>
      {educationIsNotEmpty.map((edu, index) => (
        <View key={index} style={styles.entryContainer} break>
          <View style={styles.entryHeader}>
            <Text style={styles.degree}>{edu.degree}</Text>
            {edu.startDate && (
              <Text style={styles.dateText}>
                {formatDate(edu.startDate, "yyyy-MM-dd")} –{" "}
                {edu.endDate
                  ? formatDate(edu.endDate, "yyyy-MM-dd")
                  : "Present"}
              </Text>
            )}
          </View>
          <Text style={styles.school}>{edu.school}</Text>
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer} minPresenceAhead={20}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Skills
        </Text>
      </View>
      <Text style={styles.skillsContent}>{skills.join(", ")}</Text>
    </View>
  );
}

function ActivitySection({ resumeData }: ResumeSectionProps) {
  const { activites, colorHex } = resumeData;
  const activityIsNotEmpty = activites?.filter(
    (act) => Object.values(act)?.filter(Boolean).length > 0
  );

  if (!activityIsNotEmpty?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer} minPresenceAhead={40}>
        <Text style={[styles.sectionTitleText, { color: colorHex }]}>
          Activities
        </Text>
      </View>
      {activityIsNotEmpty.map((act, index) => (
        <View key={index} style={styles.entryContainer} break>
          <View style={styles.entryHeader}>
            <Text style={styles.degree}>{act.name}</Text>
            {act.startDate && (
              <Text style={styles.dateText}>
                {formatDate(act.startDate, "yyyy-MM-dd")}
                {act.endDate
                  ? ` – ${formatDate(act.endDate, "yyyy-MM-dd")}`
                  : ""}
              </Text>
            )}
          </View>
          <Link
            src={formatLink(act.certLink || "")}
            style={[styles.link, styles.activityLink]}
          >
            {act.certLink}
          </Link>
          <Text style={styles.activityDescription}>{act.description}</Text>
        </View>
      ))}
    </View>
  );
}

// --- Stylesheet for React PDF ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  personalInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  photo: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  personalInfoTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  personalInfoTextContainerCentered: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    textAlign: "center",
    alignItems: "center",
  },
  spaceY1: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  name: {
    fontSize: 22.5,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "medium",
  },
  contactInfo: {
    fontSize: 9,
    color: "#6b7280",
  },
  contactLinksContainer: {
    fontSize: 9,
    color: "#6b7280",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactLinksContainerCentered: {
    justifyContent: "center",
  },
  link: {
    color: "#6b7280",
    textDecoration: "none",
  },
  linkSeparator: {
    marginHorizontal: 4,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  sectionTitleContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    paddingLeft: 12,
    paddingVertical: 2,
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  summaryContent: {
    fontSize: 10.5,
    paddingLeft: 12,
  },
  entryContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingLeft: 12,
  },
  entryHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "semibold",
  },
  companyName: {
    fontSize: 12.5,
  },
  dateText: {
    fontSize: 10.5,
  },
  position: {
    fontSize: 9,
    fontWeight: "semibold",
    color: "#1f2937",
    paddingLeft: 12,
  },
  description: {
    fontSize: 9,
    paddingLeft: 24,
  },
  projectName: {
    fontSize: 12.5,
    fontWeight: "semibold",
  },
  projectLinkText: {
    fontSize: 9,
    fontWeight: "semibold",
    paddingLeft: 12,
  },
  projectDescription: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 12,
  },
  degree: {
    fontSize: 10.5,
    fontWeight: "semibold",
  },
  school: {
    fontSize: 9,
    fontWeight: "semibold",
    paddingLeft: 12,
  },
  skillsContent: {
    fontSize: 10.5,
    paddingLeft: 12,
  },
  activityLink: {
    fontSize: 9,
    fontWeight: "semibold",
    paddingLeft: 12,
  },
  activityDescription: {
    fontSize: 9,
    marginTop: 4,
    paddingLeft: 12,
  },
});
