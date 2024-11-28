import { generateObject } from "ai";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
// import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import "dotenv/config";
dotenv.config();
const api_key = process.env.OPENAI_API_KEY;

const openai = createOpenAI({
  apiKey:
    "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",
  // custom settings, e.g.
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export async function GenerateCourseOutput(prompt: string) {
  console.log(api_key);
  const response = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: resultshema,
    prompt: prompt,
  });
  console.log(response);
  return response;
}

// zod type

const ProductInfoSchema = z.object({
  summary: z.string(),
  images: z.array(z.string().url()), // array of image URLs
  relevancePercentage: z.number().min(0).max(100), // relevance as a percentage (0 to 100)
  externalLink: z.string().url(), // a valid URL
  price: z.number().positive(), // price should be a positive number
  ratings: z.number().min(0).max(5), // ratings from 0 to 5
  timing: z.date(), // shipping date as a Date object
});

const resultshema = z.object({
  results: z.array(ProductInfoSchema),
});
// Type inference from Zod schema
// type ProductInfoZod = z.infer<typeof ProductInfoSchema>;
// const ProductInfoArraySchema = z.array(ProductInfoSchema);
