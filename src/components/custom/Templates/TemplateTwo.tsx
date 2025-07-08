"use client";

import { resumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";

interface ResumeTemplateProps {
  resumeData: resumeValues;
}

export default function TemplateTwo({ resumeData }: ResumeTemplateProps) {
  return (
    <div className="space-y-10 p-6">
      <Header resumeData={resumeData} />
      <SectionWrapper>
        <Summary resumeData={resumeData} />
        <WorkExperience resumeData={resumeData} />
        <Projects resumeData={resumeData} />
        <Education resumeData={resumeData} />
        <Skills resumeData={resumeData} />
        <Activities resumeData={resumeData} />
      </SectionWrapper>
    </div>
  );
}

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-8">{children}</div>
);

const Section = ({
  title,
  colorHex,
  children,
}: {
  title: string;
  colorHex: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3 break-inside-avoid">
    <h2 className="text-xl font-semibold" style={{ color: colorHex }}>
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

function Header({ resumeData }: { resumeData: resumeValues }) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    github,
    linkedin,
    city,
    country,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const url = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (url) setPhotoSrc(url);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  return (
    <div className="text-center space-y-4">
      {photoSrc && (
        <div className="mx-auto w-28 h-28 relative">
          <Image
            src={photoSrc}
            fill
            alt="Profile"
            className="object-cover"
            style={{
              borderRadius:
                borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : "12px",
            }}
          />
        </div>
      )}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">
          {firstName} {lastName}
        </h1>
        <p className="text-sm font-medium text-gray-600">{jobTitle}</p>
        <p className="text-xs text-gray-500">
          {[city, country].filter(Boolean).join(", ")} •{" "}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
        <p className="text-xs text-gray-500">
          {[linkedin, github].filter(Boolean).join(" | ")}
        </p>
      </div>
      <hr className="border-t-2 border-gray-200" />
    </div>
  );
}

function Summary({ resumeData }: ResumeTemplateProps) {
  if (!resumeData.summary) return null;
  return (
    <Section title="Professional Summary" colorHex={resumeData.colorHex!}>
      <p className="text-sm text-gray-700 whitespace-pre-line ">
        {resumeData.summary}
      </p>
    </Section>
  );
}

function WorkExperience({ resumeData }: ResumeTemplateProps) {
  const { workExperience, colorHex } = resumeData;
  const valid = workExperience?.filter((exp) =>
    Object.values(exp).some(Boolean)
  );
  if (!valid?.length) return null;

  return (
    <Section title="Work Experience" colorHex={colorHex!}>
      {valid.map((exp, i) => (
        <div key={i} className="text-sm">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>{exp.position}</span>
            <span className="text-gray-600">
              {exp.startDate ? formatDate(exp.startDate, "MM/yyyy") : ""} –{" "}
              {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-600">{exp.company}</p>
          <p className="text-xs text-gray-700 whitespace-pre-line">
            {exp.description}
          </p>
        </div>
      ))}
    </Section>
  );
}

function Projects({ resumeData }: ResumeTemplateProps) {
  const { projects, colorHex } = resumeData;
  const valid = projects?.filter((p) => Object.values(p).some(Boolean));
  if (!valid?.length) return null;

  return (
    <Section title="Projects" colorHex={colorHex!}>
      {valid.map((proj, i) => (
        <div key={i} className="text-sm">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>{proj.name}</span>
            <span className="text-gray-600">
              {proj.startDate ? formatDate(proj.startDate, "MM/yyyy") : ""} –{" "}
              {proj.endDate ? formatDate(proj.endDate, "MM/yyyy") : "Present"}
            </span>
          </div>
          {proj.gitHubLink && (
            <p className="text-xs font-semibold">GitHub: {proj.gitHubLink}</p>
          )}
          {proj.liveLink && (
            <p className="text-xs font-semibold">Live URL: {proj.liveLink}</p>
          )}
          <p className="text-xs text-gray-700 whitespace-pre-line pt-1">
            {proj.description}
          </p>
        </div>
      ))}
    </Section>
  );
}

function Education({ resumeData }: ResumeTemplateProps) {
  const { education, colorHex } = resumeData;
  const valid = education?.filter((edu) => Object.values(edu).some(Boolean));
  if (!valid?.length) return null;

  return (
    <Section title="Education" colorHex={colorHex!}>
      {valid.map((edu, i) => (
        <div key={i} className="text-sm">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>{edu.degree}</span>
            <span className="text-gray-600">
              {edu.startDate ? formatDate(edu.startDate, "MM/yyyy") : ""} –{" "}
              {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-600">{edu.school}</p>
        </div>
      ))}
    </Section>
  );
}

function Skills({ resumeData }: ResumeTemplateProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <Section title="Skills" colorHex={colorHex!}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="text-white text-xs"
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
        ))}
      </div>
    </Section>
  );
}

function Activities({ resumeData }: ResumeTemplateProps) {
  const { activites, colorHex } = resumeData;
  const valid = activites?.filter((a) => Object.values(a).some(Boolean));
  if (!valid?.length) return null;

  return (
    <Section title="Activities" colorHex={colorHex!}>
      {valid.map((act, i) => (
        <div key={i} className="text-sm">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>{act.name}</span>
            <span className="text-gray-600">
              {act.startDate ? formatDate(act.startDate, "MM/yyyy") : ""}{" "}
              {act.endDate ? `- ${formatDate(act.endDate, "MM/yyyy")}` : ""}
            </span>
          </div>
          {act.certLink && (
            <p className="text-xs font-semibold text-gray-600">
              {act.certLink}
            </p>
          )}
          <p className="text-xs text-gray-700 whitespace-pre-line">
            {act.description}
          </p>
        </div>
      ))}
    </Section>
  );
}
