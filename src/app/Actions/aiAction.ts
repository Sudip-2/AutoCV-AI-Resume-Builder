"use server";

import gemini from "@/lib/gemini";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceSchema,
  generateWorkExperienceValues,
  workExperience,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  const { jobTitle, education, skills, workExperience } =
    generateSummarySchema.parse(input);

  const aiRole = `You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional try to avoid buzzword make it ats friendly summary for the resume`;
  const userMessage = `Please generate a professional resume summary from this data:
  Job title : ${jobTitle || "N/A"}
  workExperience : ${workExperience
    ?.map(
      (
        exp
      ) => `Position:${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "still working there"},
  Description:${exp.description || "N/A"}
  `
    )
    .join("\n\n")}
  education : ${education
    ?.map(
      (
        exp
      ) => `Degree:${exp.degree || "N/A"} at ${exp.school || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "still working there"},
  `
    )
    .join("\n\n")}
  skills:${skills}
  `;

  console.log("system message:", aiRole);
  console.log("userMessage:", userMessage);

  const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userMessage,
    config: {
      systemInstruction: aiRole,
    },
  });

  const returnedAiResponse = response.text;

  if (!returnedAiResponse) {
    throw new Error("Failed to generate AI response");
  }
  return returnedAiResponse;
}

export async function generateWorkExperience(
  input: generateWorkExperienceValues
) {
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, make it from what work they did from those points, in bullet points use this • style of bullet >`;

  const userMessage = `Please provide a work experience entry from this description: ${description}`;

  const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userMessage,
    config: {
      systemInstruction: systemMessage,
    },
  });

  const returnedAiResponse = response.text;

  if (!returnedAiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log(returnedAiResponse)

  function formatDateForInput(aiDate: string): string {
    const date = new Date(aiDate);

    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return {
    position: response.text.match(/Job title:(.*)/)?.[1] || "",
    company: response.text.match(/Company:(.*)/)?.[1] || "",
    description: response.text.match(/Description:\s*([\s\S]*)/)?.[1] || "",
    startDate: formatDateForInput(
      response.text.match(/Start date:(.*)/)?.[1] || ""
    ),
    endDate: formatDateForInput(
      response.text.match(/End date:(.*)/)?.[1] || ""
    ),
  } satisfies workExperience;
}
