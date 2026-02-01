import { GoogleGenAI, Type } from "@google/genai";
import type { Lead, SupportedLanguage } from "../types";

/* =========================
   CONFIG
========================= */
const getAI = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY, // ✅ correct for Vite
  });

/* =========================
   AI INSIGHTS
========================= */
export const getAIInsights = async (
  data: any,
  language: SupportedLanguage = "English",
  deepThink: boolean = false
): Promise<string> => {
  try {
    const ai = getAI();

    const config: any = {
      systemInstruction: `You are a senior executive advisor for a premier luxury real estate developer. Respond in ${language}.`,
    };

    if (deepThink) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: deepThink ? "gemini-3-pro-preview" : "gemini-3-flash-preview",
      contents: `Analyze performance data: ${JSON.stringify(data)}. Provide 3 critical business insights.`,
      config,
    });

    return response.text ?? "Insights unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
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
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(",")[1], mimeType: "image/jpeg" } },
          { text: prompt },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) return null;

    for (const part of parts) {
      if ("inlineData" in part && part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    return null;
  }
};

/* =========================
   IMAGE ANALYSIS
========================= */
export const analyzeAssetImage = async (base64Image: string): Promise<string> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(",")[1], mimeType: "image/jpeg" } },
          { text: "Analyze this architectural or construction site image." },
        ],
      },
    });

    return response.text ?? "Analysis failed.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "Analysis failed.";
  }
};

/* =========================
   MAPS
========================= */
export const getNearbyLandmarks = async (location: string) => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What are premium landmarks near ${location}?`,
      config: { tools: [{ googleMaps: {} }] },
    });

    return {
      text: response.text ?? "",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [],
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return null;
  }
};

/* =========================
   VIDEO
========================= */
export const analyzeVideoFootage = async (videoUri: string): Promise<string> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        { fileData: { fileUri: videoUri, mimeType: "video/mp4" } },
        { text: "Analyze this project footage and estimate progress percentage." },
      ],
    });

    return response.text ?? "Analysis failed.";
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return "Analysis failed.";
  }
};

/* =========================
   FAST LEAD SUMMARY
========================= */
export const getFastLeadSummary = async (lead: Lead): Promise<string> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Quick summary of lead ${lead.name}.`,
    });

    return response.text ?? "No summary.";
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
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Score these leads 0-100. Return JSON: ${JSON.stringify(leads)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scorings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  leadId: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  reason: { type: Type.STRING },
                },
                required: ["leadId", "score", "reason"],
              },
            },
          },
          required: ["scorings"],
        },
      },
    });

    const parsed = JSON.parse(response.text ?? '{"scorings":[]}');
    const scoreMap: Record<string, LeadScoreResult> = {};

    parsed.scorings.forEach((s: LeadScoreResult) => {
      scoreMap[s.leadId] = s;
    });

    return scoreMap;
  } catch (error) {
    console.error("Gemini Lead Scoring Error:", error);
    return {};
  }
};

/* =========================
   CHAT SESSION
========================= */
export const createAIChatSession = (
  language: SupportedLanguage = "English"
) => {
  const ai = getAI();

  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are the Manortha Group Elite AI Concierge. Respond strictly in ${language}.`,
    },
  });
};
