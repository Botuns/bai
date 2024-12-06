import { ProductSearchResultSchema } from "@/lib/types/products-type";
import { MODEL_NAME, openai } from "@/openai.config";
import { generateObject } from "ai";

export async function extractStructuredResults(
  results: any,
  refined_search: any
) {
  const prompt = `You are a perfect deal finder, th user finds a deal with this query : ${refined_search},Extract structured results from the following objects: ${JSON.stringify(
    results
  )}. These are lists of products with their respective details where you analyze them critically,give a perfect,please note that you are to access with your index search capability,understand the contents in each links webpage each links to get their prices and these prices must be converted to the currency of the user location your confidence level should be awarded when you go through the webdite link or at defult based on linke stuctire, give what you feel,let the summary be a little bit lengthy and descriptive based on the results you have analysed and come up with the desired output. Output the structured results as desired in the provided schema.`;
  const response = await generateObject({
    model: openai(MODEL_NAME),
    schema: ProductSearchResultSchema,
    prompt: prompt,
  });
  return response.object;
}
