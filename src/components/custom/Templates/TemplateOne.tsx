import { resumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";
import { Badge } from "@/components/ui/badge";

interface ResumeTemplateProps {
  resumeData: resumeValues;
}

const formatLink = (link: string) => {
  if (!link) return "";
  return link.includes("https://") ? link : `https://${link}`;
};

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
          <p className="text-3xl font-bold">
            {firstName} {lastName}
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
        <div className="text-xs text-gray-500">
          <p>
            {linkedin && (
              <a
                href={formatLink(linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600"
              >
                {linkedin}
              </a>
            )}
            {linkedin && github ? " | " : ""}
            {github && (
              <a
                href={formatLink(github)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-blue-600"
              >
                {github}
              </a>
            )}
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
      <div className="h-1 bg-gray-200" />
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
      <div className="h-1 bg-gray-200" />
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
                  // style={{
                  //   color: colorHex,
                  // }}
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
      <div className="h-1 bg-gray-200" />
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
              <div className="break-inside-avoid flex items-center justify-between text-sm font-semibold">
                <span
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
              {proj.gitHubLink && (
                <p className="text-xs font-semibold">
                  GitHub:{" "}
                  <a
                    href={formatLink(proj.gitHubLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600"
                  >
                    {proj.gitHubLink}
                  </a>
                </p>
              )}
              {proj.liveLink && (
                <p className="text-xs font-semibold">
                  Live URL:{" "}
                  <a
                    href={formatLink(proj.liveLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600"
                  >
                    {proj.liveLink}
                  </a>
                </p>
              )}

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
      <div className="h-1 bg-gray-200" />
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
                  // style={{
                  //   color: colorHex,
                  // }}
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
      <div className="h-1 bg-gray-200" />
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
      <div className="h-1 bg-gray-200" />
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
                  // style={{
                  //   color: colorHex,
                  // }}
                  >
                    {formatDate(act.startDate, "MM/yyyy/dd")}
                    {act.endDate
                      ? `${" - "}${formatDate(act.endDate, "MM/yyyy/dd")}`
                      : ""}
                  </span>
                )}
              </div>
              {act.certLink && (
                <p className="text-xs font-semibold">
                  <a
                    href={formatLink(act.certLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600"
                  >
                    {act.certLink}
                  </a>
                </p>
              )}

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
