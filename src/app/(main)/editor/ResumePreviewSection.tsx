import ResumePreview from "@/components/custom/ResumePreview";
import { resumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="relative hidden md:flex md:w-1/2">
      <div className="absolute left-1 top-1 flex flex-col flex-none gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onchange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
      </div>
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
