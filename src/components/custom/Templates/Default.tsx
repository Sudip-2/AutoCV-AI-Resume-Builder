import { resumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";
import { cn } from "@/lib/utils";

interface ResumeTemplateProps {
  resumeData: resumeValues;
}

export default function Default({ resumeData }: ResumeTemplateProps) {
  return (
    <>
      <PersonalInfoHeader resumeData={resumeData} />
      <SummarySection resumeData={resumeData} />
      <WorkExperienceSection resumeData={resumeData} />
      <EducationSection resumeData={resumeData} />
      <ProjectSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
      <ActivitySection resumeData={resumeData} />
    </>
  );
}

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
    github,
    linkedin,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center  gap-6 justify-center">
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
      <div className={cn("space-y-2.5", !photoSrc && "text-center")}>
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
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
        <div className="text-xs text-gray-500">
          <p>
            <span
              onClick={() =>
                window.open(
                  linkedin?.includes("https://")
                    ? linkedin
                    : `https://${linkedin}`,
                  "_blank"
                )
              }
              className="hover:cursor-pointer hover:underline"
            >
              {linkedin}
            </span>
            {linkedin && github ? " | " : ""}
            <span
              onClick={() =>
                window.open(
                  github?.includes("https://") ? github : `https://${github}`,
                  "_blank"
                )
              }
              className="hover:cursor-pointer hover:underline"
            >
              {github}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="space-y-3 break-inside-avoid ">
        <p
          className="text-lg font-semibold pl-3 border-2 border-black"
          style={{
            color: colorHex,
          }}
        >
          Summary
        </p>
        <div className="whitespace-pre-line text-sm pl-3">{summary}</div>
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
      <div className="space-y-3">
        <p
          className="text-lg font-semibold border-2 border-black pl-3"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperienceIsNotEmpty.map((exp, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1 pl-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  className="text-[16.5px]"
                  style={{
                    color: colorHex,
                  }}
                >
                  {exp.company}
                </span>
                {exp.startDate && (
                  <span>
                    {formatDate(exp.startDate, "MM/yyyy/dd")} -{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold pl-3">{exp.position}</p>
              <div className="whitespace-pre-line text-xs pl-6">
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
      <div className="space-y-3">
        <p
          className="text-lg font-semibold border-2 border-black pl-3"
          style={{
            color: colorHex,
          }}
        >
          Project
        </p>
        {projectIsNotEmpty.map((proj, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1 pl-3">
              <div className="break-inside-avoid flex items-center justify-between text-sm font-semibold">
                <span
                  className="text-[16.5px]"
                  style={{
                    color: colorHex,
                  }}
                >
                  {proj.name}
                </span>
                {proj.startDate && (
                  <span>
                    {formatDate(proj.startDate, "MM/yyyy/dd")} -{" "}
                    {proj.endDate
                      ? formatDate(proj.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold pl-3">
                {proj.gitHubLink ? "Github: " : ""}
                <span
                  className=" hover:cursor-pointer hover:underline"
                  onClick={() =>
                    window.open(
                      proj.gitHubLink?.includes("https")
                        ? proj.gitHubLink
                        : `https://${proj.gitHubLink}`,
                      "_blank"
                    )
                  }
                >
                  {proj.gitHubLink}
                </span>
              </p>
              <p className="text-xs font-semibold pl-3 ">
                {proj.liveLink ? "Live url: " : ""}
                <span
                  className=" hover:cursor-pointer hover:underline"
                  onClick={() =>
                    window.open(
                      proj.liveLink?.includes("https")
                        ? proj.liveLink
                        : `https://${proj.liveLink}`,
                      "_blank"
                    )
                  }
                >
                  {proj.liveLink}
                </span>
              </p>
              <div className="whitespace-pre-line text-xs pt-1 pl-3">
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
      <div className="space-y-3">
        <p
          className="text-lg font-semibold border-2 border-black pl-3"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationIsNotEmpty.map((edu, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1 pl-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {edu.degree}
                </span>
                {edu.startDate && (
                  <span>
                    {formatDate(edu.startDate, "MM/yyyy/dd")} -{" "}
                    {edu.endDate
                      ? formatDate(edu.endDate, "MM/yyyy/dd")
                      : "Present"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold pl-3">{edu.school}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold border-2 border-black pl-3"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <p className="text-sm pl-3">{skills.join(", ")}</p>
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
      <div className="space-y-3 break-inside-avoid">
        <p
          className="text-lg font-semibold border-2 border-black pl-3"
          style={{
            color: colorHex,
          }}
        >
          Activities
        </p>
        {activityIsNotEmpty.map((act, index) => {
          return (
            <div key={index} className="break-inside-avoid space-y-1 pl-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span
                  style={{
                    color: colorHex,
                  }}
                >
                  {act.name}
                </span>
                {act.startDate && (
                  <span>
                    {formatDate(act.startDate, "MM/yyyy/dd")}
                    {act.endDate
                      ? `${" - "}${formatDate(act.endDate, "MM/yyyy/dd")}`
                      : ""}
                  </span>
                )}
              </div>
              <p
                className="text-xs font-semibold pl-3 hover:cursor-pointer hover:underline"
                onClick={() => window.open(act.certLink, "_blank")}
              >
                {act.certLink}
              </p>
              <div className="whitespace-pre-line text-xs mt-1 pl-3">
                {act.description}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
