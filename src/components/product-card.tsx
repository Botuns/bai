import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Product } from "@/lib/types/products-type";

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.banner_image || product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.brand}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Badge variant="secondary">{product.condition}</Badge>
        </div>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>
            {product.ratings.toFixed(1)} ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{product.location}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onSelect} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
