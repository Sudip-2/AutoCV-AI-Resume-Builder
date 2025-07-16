"use client";

import { resumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleBtn";

interface ResumeTemplateProps {
  resumeData: resumeValues;
}

const formatLink = (link: string) => {
  if (!link) return "";
  return link.includes("https://") ? link : `https://${link}`;
};

export default function TemplateTwo({ resumeData }: ResumeTemplateProps) {
  return (
    <div className="space-y-6 p-4">
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
          <a
            href={formatLink(linkedin ? linkedin : "")}
            className=" hover:cursor-pointer hover:underline"
          >
            {linkedin}
          </a>
          {linkedin && github ? " | " : ""}
          <a
            href={formatLink(github ? github : "")}
            className=" hover:cursor-pointer hover:underline"
          >
            {github}
          </a>
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
            {exp.startDate && (
              <span className="text-gray-600">
                {exp.startDate ? formatDate(exp.startDate, "yyyy-MM-dd") : ""} –{" "}
                {exp.endDate
                  ? formatDate(exp.endDate, "yyyy-MM-dd")
                  : "Present"}
              </span>
            )}
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
            {proj.startDate && (
              <span className="text-gray-600">
                {proj.startDate ? formatDate(proj.startDate, "yyyy-MM-dd") : ""}{" "}
                –{" "}
                {proj.endDate
                  ? formatDate(proj.endDate, "yyyy-MM-dd")
                  : "Present"}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold">
            {proj.gitHubLink ? "Github: " : ""}
            <a
              href={formatLink(proj.gitHubLink ? proj.gitHubLink : "")}
              className=" hover:cursor-pointer hover:underline"
            >
              {proj.gitHubLink}
            </a>
          </p>
          <p className="text-xs font-semibold">
            {proj.liveLink ? "Live url: " : ""}
            <a
              href={formatLink(proj.liveLink ? proj.liveLink : "")}
              className=" hover:cursor-pointer hover:underline"
            >
              {proj.liveLink}
            </a>
          </p>
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
              {edu.startDate ? formatDate(edu.startDate, "yyyy-MM-dd") : ""} –{" "}
              {edu.endDate ? formatDate(edu.endDate, "yyyy-MM-dd") : "Present"}
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
    <div className="break-inside-avoid space-y-3">
      <p
        className="text-xl font-semibold"
        style={{
          color: colorHex,
        }}
      >
        Skills
      </p>
      <p className="text-sm">{skills.join(", ")}</p>
    </div>
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
              {act.startDate ? formatDate(act.startDate, "yyyy-MM-dd") : ""}{" "}
              {act.endDate ? `– ${formatDate(act.endDate, "yyyy-MM-dd")}` : ""}
            </span>
          </div>
          <a
            href={formatLink(act.certLink ? act.certLink : "")}
            className=" text-xs font-semibold hover:cursor-pointer hover:underline"
          >
            {act.certLink}
          </a>
          <p className="text-xs text-gray-700 whitespace-pre-line">
            {act.description}
          </p>
        </div>
      ))}
    </Section>
  );
}
