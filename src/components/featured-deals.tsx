import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart } from "lucide-react";

export function FeaturedDealsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Featured Deals</h2>
        <Button variant="outline">View All Deals</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <FeaturedDeal key={item} />
        ))}
      </div>
    </section>
  );
}

const FeaturedDeal = () => (
  <div className="group relative rounded-3xl overflow-hidden bg-[#F5F5F5] p-4">
    <div className="absolute top-4 right-4 z-10">
      <Heart className="h-5 w-5" />
    </div>
    <Image
      src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=300&width=300"
      alt="Featured Deal"
      width={300}
      height={300}
      className="w-full object-cover rounded-2xl mb-4"
    />
    <div>
      <h3 className="font-medium">Product Name</h3>
      <p className="text-muted-foreground line-through">$199.99</p>
      <p className="text-lg font-bold">$149.99</p>
    </div>
  </div>
);

// https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg
