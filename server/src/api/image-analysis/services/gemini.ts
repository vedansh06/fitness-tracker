import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeImage = async (filePath: string) => {
  try {
    // Read the actual uploaded file
    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    // Determine mime type from file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };
    const mimeType = mimeTypes[ext] || "image/jpeg";

    const contents = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageFile,
        },
      },
      {
        text: "Extract the food name and estimated calories from this image in a JSON object.",
      },
    ];

    const config = {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          calories: { type: "number" },
        },
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config,
    });

    // response.text should be valid JSON matching the schema
    return JSON.parse(response.text);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
