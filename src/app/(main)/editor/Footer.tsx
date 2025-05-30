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
    <footer className="py-5 flex justify-between items-center border-t px-3">
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
        <Button asChild variant="outline">
          <Link href={"/resumes"}>Close</Link>
        </Button>
        {isSaving && <span className="text-muted-foreground">...saving</span>}
      </div>
    </footer>
  );
};

export default Footer;
