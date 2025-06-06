import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default gemini;
