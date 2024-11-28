import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

// Mock Featured Products Data
const featuredProducts = [
  {
    id: 1,
    name: "Sleek Modern Wireless Earbuds",
    description:
      "Immersive sound experience with noise cancellation and 24-hour battery life.",
    price: 199.99,
    discountedPrice: 149.99,
    storeName: "TechNova",
    images: [
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    ],
    buyLink: "https://example.com/product1",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker Pro",
    description:
      "Advanced health monitoring with GPS tracking and comprehensive fitness insights.",
    price: 249.99,
    discountedPrice: 179.99,
    storeName: "HealthTech",
    images: [
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    ],
    buyLink: "https://example.com/product2",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Ergonomic Home Office Chair",
    description:
      "Premium comfort with adjustable lumbar support and breathable mesh design.",
    price: 399.99,
    discountedPrice: 299.99,
    storeName: "WorkSpace Elite",
    images: [
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    ],
    buyLink: "https://example.com/product3",
    rating: 4.6,
  },
];

export function FeaturedDealsSection() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof featuredProducts)[0] | null
  >(null);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Featured Deals</h2>
        <Button
          variant="outline"
          className="hover:bg-gray-100 transition-colors"
        >
          View All Deals
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <FeaturedDeal
            key={product.id}
            product={product}
            onOpenDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

interface FeaturedDealProps {
  product: (typeof featuredProducts)[0];
  onOpenDetails: () => void;
}

export function FeaturedDeal({ product, onOpenDetails }: FeaturedDealProps) {
  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={onOpenDetails}
    >
      <div className="relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 left-2 flex items-center space-x-1">
          <Badge variant="secondary" className="bg-emerald-500/80 text-white">
            AI Pick
          </Badge>
          <Badge variant="secondary" className="bg-red-500/80 text-white">
            -{discountPercentage}%
          </Badge>
        </div>
        <button
          className="absolute top-2 right-2 rounded-full p-1.5 bg-white/80 text-gray-600 hover:bg-white hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Add your heart click logic here
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 truncate">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-primary">
              ${product.discountedPrice.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through text-xs">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-0.5 fill-current" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        <div className="mt-1 text-xs text-gray-500 truncate">
          {product.storeName}
        </div>
      </CardContent>
    </Card>
  );
}

const ProductDetailModal = ({
  product,
  onClose,
}: {
  product: (typeof featuredProducts)[0];
  onClose: () => void;
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl !p-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-2xl w-full h-96 object-cover"
            />
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  width={150}
                  height={150}
                  className="rounded-xl w-24 h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-4">
                {product.name}
              </DialogTitle>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-900 mb-4 w-fit"
              >
                AI Suggested
              </Badge>
            </DialogHeader>

            <DialogDescription className="mb-6 text-gray-600">
              {product.description}
            </DialogDescription>

            <div className="flex items-center mb-6">
              <div className="mr-4">
                <p className="text-gray-500 line-through text-xl">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-primary">
                  ${product.discountedPrice.toFixed(2)}
                </p>
              </div>
              <Badge variant="destructive" className="text-sm">
                Save ${(product.price - product.discountedPrice).toFixed(2)}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-yellow-500">
                <Star className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">From {product.storeName}</span>
            </div>

            <div className="flex space-x-4">
              <Button
                className="flex-1 "
                onClick={() => window.open(product.buyLink, "_blank")}
              >
                <ShoppingCart className="mr-2" /> Buy Now
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(product.buyLink, "_blank")}
              >
                <ExternalLink className="mr-2" /> Visit Store
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeaturedDealsSection;
