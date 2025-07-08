"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { resumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { mapToResumeValues, ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
  canUserPremTempl?: boolean;
}

const ResumeEditor = ({
  resumeToEdit,
  canUserPremTempl,
}: ResumeEditorProps) => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [resumeData, setResumeData] = useState<resumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}
  );
  const [showSmResumePrev, setShowSmResumePrev] = useState(false);

  const { hasUnsavedChanges, isSaving } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  //sets the search query step in url
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  //Gives the component for the mapped key
  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <>
      <div className="mx-auto flex grow flex-col w-full">
        <header className="text-center py-5 border-b px-3 space-y-2.5">
          <h1 className="text-2xl font-semibold">Create your resume</h1>
          <p className="text-sm text-muted-foreground">
            Fill your details to create resume. Your progress will be saved
            automatically after 1.5 sec.
          </p>
        </header>
        <main className="relative grow">
          <div
            className={"absolute bottom-0 top-0 flex w-full overflow-y-auto"}
          >
            <div
              className={cn(
                "w-full md:w-1/2 overflow-y-auto md:block",
                showSmResumePrev && "hidden"
              )}
              style={{
                scrollbarWidth: "none",
              }}
            >
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
            <div className="border-r" />
            <ResumePreviewSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              className={cn(showSmResumePrev && "flex")}
              canUserPremTempl={canUserPremTempl}
            />
          </div>
        </main>
        <Footer
          currentStep={currentStep}
          setCurrentStep={setStep}
          showSmResumePrev={showSmResumePrev}
          setShowSmResumePrev={setShowSmResumePrev}
          isSaving={isSaving}
        />
      </div>
    </>
  );
};

export default ResumeEditor;
