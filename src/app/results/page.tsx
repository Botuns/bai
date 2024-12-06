"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product, ProductSearchResult } from "@/lib/types/products-type";
import ProductModal from "@/components/products-modal";
import ProductCard from "@/components/product-card";
import { ArrowLeft } from "lucide-react";

export default function SearchResults() {
  const [searchResults, setSearchResults] =
    useState<ProductSearchResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSearchResults = () => {
      setIsLoading(true);
      try {
        const storedResults = localStorage.getItem("searchResults");
        if (storedResults) {
          setSearchResults(JSON.parse(storedResults));
        } else {
          setError("No search results found");
        }
      } catch (err: any) {
        setError("Error fetching search results" + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // fetch imaghes from loacal storage
    const fetchImages = () => {
      try {
        const storedImages = localStorage.getItem("images");
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        }
      } catch (err: any) {
        setError("Error fetching images" + err.message);
      }
    };
    fetchImages();
    fetchSearchResults();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* add back button with lucide react */}
      <div className="mb-8">
        <Button
          onClick={() => {
            window.history.back();
          }}
          variant={"ghost"}
        >
          <span>
            <ArrowLeft className="h-4 w-4 mr-2" />
          </span>
          Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6">{searchResults?.title}</h1>
      <p className="text-lg mb-8">{searchResults?.summary}</p>

      <div className="flex flex-wrap gap-4 mb-8">
        <Input
          className="flex-grow"
          placeholder="Refine your search..."
          type="search"
        />
        <Button>Search</Button>
      </div>
      {/* display imges */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* check if images are prsent oo */}
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Product"
            className="w-24 h-24 object-cover rounded-lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
