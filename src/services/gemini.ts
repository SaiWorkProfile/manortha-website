import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Lead, SupportedLanguage } from "../types";

/* =========================
   CONFIG
========================= */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/* =========================
   CHAT SESSION
========================= */
export const createAIChatSession = (language: SupportedLanguage = "English") => {
  return model.startChat({
    systemInstruction: `You are the Manortha Group Elite AI Concierge. Respond strictly in ${language}.`,
  });
};

/* =========================
   AI INSIGHTS
========================= */
export const getAIInsights = async (
  data: any,
  language: SupportedLanguage = "English",
  deepThink: boolean = false
): Promise<string> => {
  try {
    const result = await model.generateContent(
      `You are a senior real estate executive advisor. Respond in ${language}.
       Analyze this data and give 3 business insights: ${JSON.stringify(data)}`
    );
    return result.response.text();
  } catch (e) {
    console.error("getAIInsights error", e);
    return "Insights unavailable.";
  }
};

/* =========================
   IMAGE EDIT
========================= */
export const editProjectImage = async (
  base64Image: string,
  prompt: string
): Promise<string | null> => {
  try {
    const result = await model.generateContent([
      { inlineData: { data: base64Image.split(",")[1], mimeType: "image/jpeg" } },
      { text: prompt }
    ]);

    const parts = result.response.candidates?.[0]?.content?.parts;
    if (!parts) return null;

    for (const part of parts) {
      if ("inlineData" in part && part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("editProjectImage error", e);
    return null;
  }
};

/* =========================
   IMAGE ANALYSIS
========================= */
export const analyzeAssetImage = async (base64Image: string): Promise<string> => {
  try {
    const result = await model.generateContent([
      { inlineData: { data: base64Image.split(",")[1], mimeType: "image/jpeg" } },
      { text: "Analyze this real estate or construction site image." }
    ]);
    return result.response.text();
  } catch (e) {
    console.error("analyzeAssetImage error", e);
    return "Analysis failed.";
  }
};

/* =========================
   LANDMARKS
========================= */
export const getNearbyLandmarks = async (location: string) => {
  try {
    const result = await model.generateContent(
      `List premium landmarks, metro stations and schools near ${location}.`
    );
    return {
      text: result.response.text(),
      chunks: []
    };
  } catch (e) {
    console.error("getNearbyLandmarks error", e);
    return null;
  }
};

/* =========================
   VIDEO ANALYSIS
========================= */
export const analyzeVideoFootage = async (videoUrl: string): Promise<string> => {
  try {
    const result = await model.generateContent(
      `Analyze this real estate project video and estimate construction progress: ${videoUrl}`
    );
    return result.response.text();
  } catch (e) {
    console.error("analyzeVideoFootage error", e);
    return "Video analysis failed.";
  }
};

/* =========================
   FAST LEAD SUMMARY
========================= */
export const getFastLeadSummary = async (lead: Lead): Promise<string> => {
  try {
    const result = await model.generateContent(
      `Summarize this lead and give 1 action advice: ${JSON.stringify(lead)}`
    );
    return result.response.text();
  } catch {
    return "No summary.";
  }
};

/* =========================
   LEAD SCORING
========================= */
export interface LeadScoreResult {
  leadId: string;
  score: number;
  reason: string;
}

export const calculateLeadScores = async (
  leads: Lead[]
): Promise<Record<string, LeadScoreResult>> => {
  try {
    const result = await model.generateContent(
      `Score these real estate leads from 0 to 100 and explain why:
       ${JSON.stringify(leads)}`
    );

    const text = result.response.text();
    const parsed = JSON.parse(text);
    const scoreMap: Record<string, LeadScoreResult> = {};

    parsed.scorings?.forEach((s: LeadScoreResult) => {
      scoreMap[s.leadId] = s;
    });

    return scoreMap;
  } catch (e) {
    console.error("calculateLeadScores error", e);
    return {};
  }
};
