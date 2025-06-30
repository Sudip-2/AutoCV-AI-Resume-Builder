import { resumeValues } from "@/lib/validation";
import { useState } from "react";
import LoadingBtn from "./LoadingBtn";
import { WandSparklesIcon } from "lucide-react";
import { toast } from "sonner";
import {generateSummary} from "@/app/Actions/aiAction";

interface GenerateSummaryBtnProps {
  resumeData: resumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryBtn({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryBtnProps) {
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    try {
        setLoading(true)
        const aiResponse = await generateSummary(resumeData)
        onSummaryGenerated(aiResponse)
        
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong. try again")
    }
    finally{
        setLoading(false)
    }
  }
  return (
    <LoadingBtn
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4" />
      Summary with AI
    </LoadingBtn>
  );
}
