"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { resumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";

const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [resumeData, setResumeData] = useState<resumeValues>({});
  const [showSmResumePrev, setShowSmResumePrev] = useState(false);

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
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto flex grow flex-col w-full">
        <header className="text-center py-5 border-b px-3">
          <h1 className="text-2xl font-semibold">Design your resume</h1>
          <p className="text-sm text-muted-foreground">
            Follow the steps below to create your resume. Your progress will be
            saved automatically.
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
            />
          </div>
        </main>
        <Footer
          currentStep={currentStep}
          setCurrentStep={setStep}
          showSmResumePrev={showSmResumePrev}
          setShowSmResumePrev={setShowSmResumePrev}
        />
      </div>
    </>
  );
};

export default ResumeEditor;
