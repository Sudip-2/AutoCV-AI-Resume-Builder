import { Prisma } from "@/generated/prisma";
import { resumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  Education: true,
  Projects: true,
  Activities: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export function mapToResumeValues(data: ResumeServerData): resumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperience:
      data.workExperiences.map((exp) => ({
        position: exp.position || undefined,
        company: exp.company || undefined,
        startDate: exp.startDate?.toISOString().split("T")[0] || undefined,
        endDate: exp.endDate?.toISOString().split("T")[0] || undefined,
        description: exp.description || undefined,
      })) || undefined,
    education:
      data.Education.map((edu) => ({
        degree: edu.degree || undefined,
        school: edu.school || undefined,
        startDate: edu.startDate?.toISOString().split("T")[0] || undefined,
        endDate: edu.endDate?.toISOString().split("T")[0] || undefined,
      })) || undefined,
    projects:
      data.Projects.map((proj) => ({
        name: proj.name || undefined,
        description: proj.description || undefined,
        gitHubLink: proj.gitHubLink || undefined,
        liveLink: proj.liveLink || undefined,
        startDate: proj.startDate?.toISOString().split("T")[0] || undefined,
        endDate: proj.endDate?.toISOString().split("T")[0] || undefined,
      })) || undefined,
    activites:
      data.Activities.map((act) => ({
        name: act.name || undefined,
        description: act.description || undefined,
        certLink: act.certLink || undefined,
        startDate: act.startDate?.toISOString().split("T")[0] || undefined,
        endDate: act.endDate?.toISOString().split("T")[0] || undefined,
      })) || undefined,
    skills: data.skills || undefined,
    borderStyle: data.borderStyle,
    summary: data.summary || undefined,
    colorHex: data.colorHex,
    linkedin: data.linkedin || undefined,
    github: data.github || undefined,
    template: data.template,
  };
}
