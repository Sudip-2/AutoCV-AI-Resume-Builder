import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";

interface footerProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const Footer = ({ currentStep, setCurrentStep }: footerProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="py-5 flex justify-between border-t px-3">
      <div className="flex gap-3">
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
      <div className="flex gap-3 items-center">
        <Button asChild variant="outline">
          <Link href={"/resumes"}>Close</Link>
        </Button>
        <span className="text-muted-foreground">...saving</span>
      </div>
    </footer>
  );
};

export default Footer;
