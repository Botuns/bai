import { MODEL_NAME, openai } from "@/openai.config";
import { generateObject } from "ai";
import z from "zod";
type BudgetType = "very_cheap" | "economical" | "normal" | "luxury";

export type QueryParams = {
  originalQuery: string;
  budget: BudgetType;
  location: string;
  brandCondition: string;
  additionalContext: Record<string, unknown>;
};
const locationModifier = (location: string) =>
  location === "global" ? "" : `in ${location}`;

const budgetTranslation = {
  very_cheap: "budget-friendly, lowest price, discount, clearance",
  economical: "best value, affordable, cost-effective",
  normal: "mid-range, standard pricing",
  luxury: "premium, high-end, top-tier",
};
const conditionModifier = (brandCondition: string) =>
  ({
    used: "second-hand, pre-owned, refurbished",
    new: "brand new, latest model, unused",
    any: "",
  }[brandCondition]);
export async function refineUserQuery(params: QueryParams) {
  const systemPrompt = `You are an expert search query optimizer especially for the tavily api. Refine the following search query to:
    1. Maximize search result relevance
    2. Include synonyms and related terms
    3. Optimize for finding the best deals
    4. Incorporate budget and condition specifics

    Consider:
    - Budget context: ${budgetTranslation[params.budget]}
    - Location: ${locationModifier(params.location)}
    - Product condition: ${conditionModifier(params.brandCondition)}
    
    Output ONLY the refined, optimized search query with the provided schema.`;
  const search_response = await generateObject({
    model: openai(MODEL_NAME),
    schema: refined_query_schema,
    // system: params.originalQuery,
    // prompt: systemPrompt,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: params.originalQuery },
    ],
  });

  const refinedQuery = search_response.object;
  return refinedQuery;
}


const refined_query_schema = z.object({
  refined_query: z.string(),
  strength: z.string(),
});

// class QueryRefiner {
//   constructor() {
//     this.openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//       dangerouslyAllowBrowser: true,
//     });
//   }

/**
 * Refine search query based on user inputs
 * @param {Object} params - Search parameters
 * @returns {Promise<string>} Refined search query
 */
//   async refineQuery(params) {
//     const {
//       originalQuery,
//       budget = "normal",
//       location = "global",
//       brandCondition = "any",
//       additionalContext = {},
//     } = params;

//     // Budget mapping

//     // Location handling

//     // Brand condition mapping

//     // Construct context-aware prompt

//     try {
//       const chatCompletion = await this.openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: originalQuery },
//         ],
//         max_tokens: 100,
//         temperature: 0.7,
//       });

//       return chatCompletion.choices[0].message.content.trim();
//     } catch (error) {
//       console.error("Query refinement error:", error);
//       return originalQuery; // Fallback to original query
//     }
//   }

/**
 * Perform deal search using refined query
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Search results
 */
//   async searchDeals(params) {
//     const refinedQuery = await this.refineQuery(params);

//     // Example using Tavily API
//     const response = await fetch("https://api.tavily.com/search", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
//       },
//       body: JSON.stringify({
//         query: refinedQuery,
//         max_results: 10,
//         include_domains: [], // Optional: restrict to specific domains
//         include_answer: true,
//       }),
//     });

//     const searchResults = await response.json();
//     return this.processSearchResults(searchResults);
//   }

//   /**
//    * Process and filter search results
//    * @param {Object} searchResults - Raw search results
//    * @returns {Array} Processed and filtered deals
//    */
//   processSearchResults(searchResults) {
//     return searchResults.results
//       .filter((result) => this.isDealLikely(result))
//       .map((result) => ({
//         title: result.title,
//         link: result.url,
//         description: result.content,
//         price: this.extractPrice(result.content),
//       }));
//   }

//   /**
//    * Check if a search result is likely a deal
//    * @param {Object} result - Search result
//    * @returns {boolean} Whether result is a probable deal
//    */
//   isDealLikely(result) {
//     const dealIndicators = [
//       "discount",
//       "sale",
//       "deal",
//       "coupon",
//       "promo",
//       "clearance",
//       "best price",
//     ];

//     return dealIndicators.some(
//       (indicator) =>
//         result.title.toLowerCase().includes(indicator) ||
//         result.content.toLowerCase().includes(indicator)
//     );
//   }

//   /**
//    * Extract potential price from result content
//    * @param {string} content - Result content
//    * @returns {number|null} Extracted price or null
//    */
//   extractPrice(content) {
//     const priceRegex = /\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/;
//     const match = content.match(priceRegex);
//     return match ? parseFloat(match[1].replace(",", "")) : null;
//   }
// }

// export default QueryRefiner;

// // Example usage
// async function exampleSearch() {
//   const refiner = new QueryRefiner();
//   const deals = await refiner.searchDeals({
//     originalQuery: "iPhone 15",
//     budget: "economical",
//     location: "USA",
//     brandCondition: "new",
//   });
//   console.log(deals);
// }
