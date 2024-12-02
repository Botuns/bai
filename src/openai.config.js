import "dotenv/config";
import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

export const openai = createOpenAI({
  apiKey,
  compatibility: "strict",
});

export const MODEL_NAME = "gpt-4o-mini";
