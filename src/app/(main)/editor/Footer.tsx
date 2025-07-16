import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface footerProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePrev: boolean;
  setShowSmResumePrev: (show: boolean) => void;
  isSaving: boolean;
}

const Footer = ({
  currentStep,
  setCurrentStep,
  showSmResumePrev,
  setShowSmResumePrev,
  isSaving,
}: footerProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="py-5 border-t px-3">
      <div className="container mx-auto flex justify-between items-center gap-2">
        <div className="flex gap-3 flex-wrap-reverse">
          <Button
            variant="outline"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowSmResumePrev(!showSmResumePrev)}
          className="md:hidden"
          title={`${showSmResumePrev ? "Show input form" : "Show resume preview"}`}
        >
          {showSmResumePrev ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex gap-3 items-center ml-2 ">
          <Button asChild variant="outline" disabled={isSaving}>
            <Link href={"/resumes"}>{isSaving ? "...saving" : "Close"}</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
