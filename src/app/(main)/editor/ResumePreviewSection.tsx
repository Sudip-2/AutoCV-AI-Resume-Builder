import ResumePreview from "@/components/custom/ResumePreview";
import { resumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="hidden md:flex md:w-1/2">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
