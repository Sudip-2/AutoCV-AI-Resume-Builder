import { cn } from "@/lib/utils"
import { resumeValues } from "@/lib/validation"

interface ResumePreviewProps{
    resumeData:resumeValues,
    className:string
}

const ResumePreview = ({className,resumeData}:ResumePreviewProps) => {
  return (
    <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]",className)}>
        <h1>This text should change with the size of the container div</h1>
    </div>
  )
}

export default ResumePreview