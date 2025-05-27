import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "./steps";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const Breadcrumbs = ({ currentStep, setCurrentStep }: BreadcrumbsProps) => {
  return (
    <div className="flex justify-center pt-4 px-3">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((steps) => (
            <React.Fragment key={steps.key}>
              <BreadcrumbItem>
                {steps.key === currentStep ? (
                  <BreadcrumbPage>{steps.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(steps.key)}>
                      {steps.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden"/>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
