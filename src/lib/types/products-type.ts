import z from "zod";
export interface Product {
  id: string;
  name: string;
  price: number;
  condition: string;
  brand: string;
  location: string;
  category: string;
  description: string;
  images: string[];
  store: string;
  ratings: number;
  confidence: number;
  reviews: number;
  banner_image: string;
  link_to_store: string;
}

export interface ProductSearchResult {
  title: string;
  summary: string;
  products: Product[];
}

// create zod interface to get products results
export const ProductSearchResultSchema = z.object({
  title: z.string(),
  summary: z.string(),
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      condition: z.string(),
      brand: z.string(),
      location: z.string(),
      category: z.string(),
      description: z.string(),
      images: z.array(z.string().url()),
      store: z.string(),
      ratings: z.number(),
      confidence: z.number(),
      reviews: z.number(),
      banner_image: z.string().url(),
      link_to_store: z.string().url(),
    })
  ),
});
