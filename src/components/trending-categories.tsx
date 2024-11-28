import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TrendingCategoriesSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Trending Categories</h2>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <TrendingCategory
          image="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=150&width=150"
          title="Electronics"
        />
        <TrendingCategory
          image="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=150&width=150"
          title="Fashion"
        />
        <TrendingCategory
          image="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=150&width=150"
          title="Home"
        />
        <TrendingCategory
          image="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=150&width=150"
          title="Travel"
        />
        <TrendingCategory
          image="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg?height=150&width=150"
          title="Gifts"
        />
      </div>
    </section>
  );
}

const TrendingCategory = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="relative w-full aspect-square mb-2">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded-2xl"
      />
    </div>
    <p className="text-sm font-medium">{title}</p>
  </div>
);
