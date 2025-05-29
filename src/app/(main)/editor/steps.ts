import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import ProjectForm from "./forms/ProjectForm";
import ActivityForm from "./forms/ActivityForm"

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  { title: "Summary", component: SummaryForm, key: "summary" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Project",
    component: ProjectForm,
    key: "project",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skill", component: SkillsForm, key: "skill" },
  { title: "Activity", component: ActivityForm, key: "activity" },
];
