import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "../ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";

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
        className={cn("space-y-4 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <ActivitySection resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumePreview;

interface ResumeSectionProps {
  resumeData: resumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    city,
    country,
    email,
    firstName,
    jobTitle,
    lastName,
    phone,
    photo,
    colorHex,
    borderStyle,
  } = resumeData;

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
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName}
            {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
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
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="space-y-3 break-inside-avoid">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;

  const workExperienceIsNotEmpty = workExperience?.filter(
    (exp) => Object.values(exp)?.filter(Boolean).length > 0
  );

  if (!workExperienceIsNotEmpty?.length) return null;

  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperienceIsNotEmpty.map((exp, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {exp.position}
                </span>
                {exp.startDate && (
                  <span
                    style={{
                      color: colorHex,
                    }}
                  >
                    {formatDate(exp.startDate, "MM/yyyy/dd")} -{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{exp.company}</p>
              <div className="whitespace-pre-line text-xs">
                {exp.description}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectIsNotEmpty = projects?.filter(
    (proj) => Object.values(proj)?.filter(Boolean).length > 0
  );

  if (!projectIsNotEmpty?.length) return null;

  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Project
        </p>
        {projectIsNotEmpty.map((proj, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {proj.name}
                </span>
                {proj.startDate && (
                  <span
                    style={{
                      color: colorHex,
                    }}
                  >
                    {formatDate(proj.startDate, "MM/yyyy/dd")} -{" "}
                    {proj.endDate
                      ? formatDate(proj.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">
                {proj.gitHubLink ? "Github: " : ""}
                {proj.gitHubLink}
              </p>
              <p className="text-xs font-semibold">
                {proj.liveLink ? "Live url: " : ""}
                {proj.liveLink}
              </p>
              <div className="whitespace-pre-line text-xs pt-2">
                {proj.description}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;

  const educationIsNotEmpty = education?.filter(
    (edu) => Object.values(edu)?.filter(Boolean).length > 0
  );

  if (!educationIsNotEmpty?.length) return null;

  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationIsNotEmpty.map((edu, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {edu.degree}
                </span>
                {edu.startDate && (
                  <span
                    style={{
                      color: colorHex,
                    }}
                  >
                    {formatDate(edu.startDate, "MM/yyyy/dd")} -{" "}
                    {edu.endDate
                      ? formatDate(edu.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{edu.school}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => {
            return (
              <Badge
                key={index}
                className="bg-black text-white"
                style={{
                  backgroundColor: colorHex,
                  borderRadius:
                    borderStyle === BorderStyles.SQUARE
                      ? "0px"
                      : borderStyle === BorderStyles.CIRCLE
                        ? "9999px"
                        : "8px",
                }}
              >
                {skill}
              </Badge>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ActivitySection({ resumeData }: ResumeSectionProps) {
  const { activites, colorHex } = resumeData;

  const activityIsNotEmpty = activites?.filter(
    (act) => Object.values(act)?.filter(Boolean).length > 0
  );

  if (!activityIsNotEmpty?.length) return null;

  return (
    <>
      <div
        className="h-1 bg-gray-200"
        style={{
          backgroundColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Activities
        </p>
        {activityIsNotEmpty.map((act, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {act.name}
                </span>
                {act.startDate && (
                  <span
                    style={{
                      color: colorHex,
                    }}
                  >
                    {formatDate(act.startDate, "MM/yyyy/dd")}
                    {act.endDate
                      ? `${" - "}${formatDate(act.endDate, "MM/yyyy/dd")}`
                      : ""}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold">{act.certLink}</p>
              <div className="whitespace-pre-line text-xs">
                {act.description}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
