import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { Product } from "@/lib/types/products-type";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.brand}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative h-64">
              <Image
                src={product.images[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.slice(1).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.name} - Image ${index + 2}`}
                  width={80}
                  height={80}
                  objectFit="cover"
                  className="rounded-md"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="secondary">{product.condition}</Badge>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>
                {product.ratings.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div>
              <h3 className="font-semibold mb-1">Category</h3>
              <p>{product.category}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p>{product.location}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Store</h3>
              <p>{product.store}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Confidence</h3>
              <p>{product.confidence}%</p>
            </div>
            <Button className="w-full" asChild>
              <a
                href={product.link_to_store}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Store <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
