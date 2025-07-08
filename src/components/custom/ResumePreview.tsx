import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import { JSX, useRef } from "react";
import Default from "./Templates/Default";
import TemplateOne from "./Templates/TemplateOne";
import TemplateTwo from "./Templates/TemplateTwo";

interface ResumePreviewProps {
  resumeData: resumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className: string;
}

const ResumePreview = ({
  className,
  resumeData,
  contentRef,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  let template: Record<string, JSX.Element> = {
    default: <Default resumeData={resumeData} />,
    templateOne: <TemplateOne resumeData={resumeData} />,
    templateTwo: <TemplateTwo resumeData={resumeData} />,
  };
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-4 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePrevContent"
      >
        {template[resumeData.template || "default"]}
      </div>
    </div>
  );
};

export default ResumePreview;
