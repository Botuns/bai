import { ProductSearchResultSchema } from "@/lib/types/products-type";
import { MODEL_NAME, openai } from "@/openai.config";
import { generateObject } from "ai";

export async function extractStructuredResults(results: any) {
  const prompt = `Extract structured results from the following objects: ${JSON.stringify(
    results
  )}. These are lists of products with their respective details where you analyze them critically and come up with the desired output. Output the structured results as desired in the provided schema.`;
  const response = await generateObject({
    model: openai(MODEL_NAME),
    schema: ProductSearchResultSchema,
    prompt: prompt,
  });
  return response.object;
}
