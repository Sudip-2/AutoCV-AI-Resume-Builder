"use server";

import gemini from "@/lib/gemini";
import { GenerateSummaryInput, generateSummarySchema, generateWorkExperienceSchema, generateWorkExperienceValues } from "@/lib/validation";

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

  console.log(returnedAiResponse)
  return returnedAiResponse;
}


export async function generateWorkExperience(input:generateWorkExperienceValues) {
  const {description} = generateWorkExperienceSchema.parse(input)
}