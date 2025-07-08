// import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import gemini from "@/lib/gemini";

export async function POST(request: Request) {
  const data = await request.formData();
  const resumeFile: File = data.get("resume") as File;
  const aiRole = `You are a resume analysis AI.
Given the text content of a resume, evaluate its quality for ATS (Applicant Tracking System) optimization.
Your response must adhere to the following structure:

score : <A number between 0 to 100, representing the resume’s ATS compatibility>
strongPoints : <an optimized strongPoints in bullet format, in bullet points only use this • style of bullet, don't need to add headings, just the points>
weakPoints : <an optimized weakPoints in bullet format, in bullet points only use this • style of bullet,don't need to add headings, just the points>
recommendations: <an optimized recommendations in bullet format, in bullet points only use this • style of bullet, don't need to add headings, just the points>
`;
  if (!resumeFile) {
    return new Response("No file uploaded", { status: 400 });
  }
  const bytes = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // if (resumeFile.type === "application/pdf") {
  //   const dataFromFile = await pdfParse(buffer);
  //   const userMessage = `Here is the resume text: ${dataFromFile.text}`;
  //   const response = await gemini.models.generateContent({
  //     model: "gemini-2.0-flash",
  //     contents: userMessage,
  //     config: {
  //       systemInstruction: aiRole,
  //     },
  //   });
  //   if (!response.text) {
  //     return new Response("Failed to analyze resume", { status: 500 });
  //   }
  //   console.log(response.text);
  //   const score = response.text.match(/score\s*:\s*(\d+)/i)?.[1] || "";

  //   const strongPointsBlock =
  //     response.text.match(
  //       /strongPoints\s*:\s*([\s\S]*?)weakPoints\s*:/i
  //     )?.[1] || "";

  //   const weakPointsBlock =
  //     response.text.match(
  //       /weakPoints\s*:\s*([\s\S]*?)recommendations\s*:/i
  //     )?.[1] || "";

  //   const recommendationsBlock =
  //     response.text.match(/recommendations\s*:\s*([\s\S]*)/i)?.[1] || "";

  //   // Matches lines starting with bullet points using • or *
  //   const bulletRegex = /^[•*]\s+(.*)$/gm;

  //   function extractBullets(textBlock: string) {
  //     const points = [];
  //     let match;
  //     while ((match = bulletRegex.exec(textBlock)) !== null) {
  //       points.push(match[1].trim());
  //     }
  //     return points;
  //   }

  //   const jsonResponse = {
  //     score: parseInt(score),
  //     strongPoints: extractBullets(strongPointsBlock),
  //     weakPoints: extractBullets(weakPointsBlock),
  //     recommendations: extractBullets(recommendationsBlock),
  //   };
  //   console.log(jsonResponse);
  //   return new Response(JSON.stringify(jsonResponse), { status: 200 });
  // } else 
  if (
    resumeFile.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const dataFromFile = await mammoth.extractRawText({ buffer });
    const userMessage = `Here is the resume text: ${dataFromFile.value}`;
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
      config: {
        systemInstruction: aiRole,
      },
    });
    if (!response.text) {
      return new Response("Failed to analyze resume", { status: 500 });
    }
    console.log(response.text);
    const score = response.text.match(/score\s*:\s*(\d+)/i)?.[1] || "";

    const strongPointsBlock =
      response.text.match(
        /strongPoints\s*:\s*([\s\S]*?)weakPoints\s*:/i
      )?.[1] || "";

    const weakPointsBlock =
      response.text.match(
        /weakPoints\s*:\s*([\s\S]*?)recommendations\s*:/i
      )?.[1] || "";

    const recommendationsBlock =
      response.text.match(/recommendations\s*:\s*([\s\S]*)/i)?.[1] || "";

    // Matches lines starting with bullet points using • or *
    const bulletRegex = /^[•*]\s+(.*)$/gm;

    function extractBullets(textBlock: string) {
      const points = [];
      let match;
      while ((match = bulletRegex.exec(textBlock)) !== null) {
        points.push(match[1].trim());
      }
      return points;
    }

    const jsonResponse = {
      score: parseInt(score),
      strongPoints: extractBullets(strongPointsBlock),
      weakPoints: extractBullets(weakPointsBlock),
      recommendations: extractBullets(recommendationsBlock),
    };
    console.log(jsonResponse);
    return new Response(JSON.stringify(jsonResponse), { status: 200 });
  } else {
    return new Response("Unsupported file type", { status: 400 });
  }
}
