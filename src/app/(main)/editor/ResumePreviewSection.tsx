import ResumePreview from "@/components/custom/ResumePreview";
import { resumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleBtn from "./BorderStyleBtn";
import { cn } from "@/lib/utils";
import TempChoose from "./TempChoose";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
  className?: string;
  canUserPremTempl?: boolean;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className,
  canUserPremTempl,
}: ResumePreviewSectionProps) => {
  return (
    <div className={cn("relative hidden w-full md:flex md:w-1/2", className)}>
      <div className="absolute right-2.5 top-1 flex flex-none gap-3 lg:right-4 lg:top-2">
        <TempChoose
          template={resumeData.template ? resumeData.template : "default"}
          onchange={(design: string) => {
            setResumeData({ ...resumeData, template: design });
          }}
          isDisabledBool={canUserPremTempl!}
        />
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
