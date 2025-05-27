import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {formatDate} from "date-fns"
 
interface ResumePreviewProps {
  resumeData: resumeValues;
  className: string;
}

const ResumePreview = ({ className, resumeData }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: resumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { city, country, email, firstName, jobTitle, lastName, phone, photo } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName}
            {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? "," : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="h-1 bg-gray-300" />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold">Professional profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperience } = resumeData;

  const workExperienceIsNotEmpty = workExperience?.filter(
    (exp) => Object.values(exp)?.filter(Boolean).length > 0
  );

  if (!workExperienceIsNotEmpty?.length) return null;

  return (
    <>
      <div className="h-1 bg-gray-300" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work experience</p>
        {
          workExperienceIsNotEmpty.map((exp,index) => {
            return(
              <div key={index} className="break-inside-avoid space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{exp.position}</span>
                  {exp.startDate && (
                    <span>
                      {formatDate(exp.startDate,"MM/yyyy")} -{" "}
                      {exp.endDate? formatDate(exp.startDate,"MM/yyyy"):"Present"}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold">{exp.company}</p>
                <div className="whitespace-pre-line text-xs">{exp.description}</div>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
