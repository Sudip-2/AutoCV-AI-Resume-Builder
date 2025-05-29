import ResumePreview from "@/components/custom/ResumePreview";
import { resumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleBtn from "./BorderStyleBtn";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
  className?: string;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) => {
  return (
    <div className={cn("relative hidden w-full md:flex md:w-1/2", className)}>
      <div className="absolute left-1 top-1 flex flex-col flex-none gap-3 lg:left-2 lg:top-2">
        <ColorPicker
          color={resumeData.colorHex}
          onchange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
        <BorderStyleBtn
          borderStyle={resumeData.borderStyle}
          onchange={(border) => {
            setResumeData({ ...resumeData, borderStyle: border });
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
