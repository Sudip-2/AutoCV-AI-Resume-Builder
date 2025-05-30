import useDebounce from "@/hooks/useDebounce";
import { resumeValues } from "@/lib/validation";
import { useEffect, useState } from "react";

export default function useAutoSaveResume(resumeData: resumeValues) {
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);
    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      save();
    }
  }, [debouncedResumeData]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData),
  };
}
