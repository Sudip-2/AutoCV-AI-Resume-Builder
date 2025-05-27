import { resumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}
