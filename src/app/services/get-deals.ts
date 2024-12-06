import { tvly } from "../search";

export async function searchDeals(query: string) {
  const response = await tvly.search(query, {
    includeAnswer: true,
    includeImages: true,
    maxResults: 10,
    includeDomains: [],
  });
  //   const searchResults = await response.json();
  // save images to local storage
  localStorage.setItem("images", JSON.stringify(response.images));
  console.log(response);
  return processSearchResults(response);
}

function processSearchResults(searchResults: any) {
  return searchResults.results
    .filter((result) => isDealLikely(result))
    .map((result) => ({
      title: result.title,
      link: result.url,
      description: result.content,
      price: extractPrice(result.content),
    }));
}

function isDealLikely(result: any) {
  const dealIndicators = [
    "discount",
    "sale",
    "deal",
    "coupon",
    "promo",
    "clearance",
    "best price",
  ];

  return dealIndicators.some(
    (indicator) =>
      result.title.toLowerCase().includes(indicator) ||
      result.content.toLowerCase().includes(indicator)
  );
}

function extractPrice(content: any) {
  const priceRegex = /\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/;
  const match = content.match(priceRegex);
  return match ? parseFloat(match[1].replace(",", "")) : null;
}
