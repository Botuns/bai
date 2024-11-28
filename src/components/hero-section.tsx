// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

// export function HeroSection() {
//   const [searchInput, setSearchInput] = useState("");

//   return (
//     <section className="grid lg:grid-cols-[2fr,1fr] gap-6">
//       <div className="relative rounded-3xl overflow-hidden bg-[#E8EDE3] p-12 flex flex-col justify-center">
//         <h2 className="text-4xl font-bold mb-4">
//           Smart Shopping, Tailored for You
//         </h2>
//         <p className="text-lg mb-8 text-muted-foreground">
//           Find the best deals with our AI-powered search
//         </p>
//         <div className="relative w-full max-w-md">
//           <Input
//             placeholder="Search for anything..."
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             className="pl-10 pr-20"
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//           <Button className="absolute right-1 top-1">Search</Button>
//         </div>
//       </div>
//       <div className="grid grid-rows-2 gap-6">
//         <div className="relative rounded-3xl overflow-hidden bg-[#F5F5F5] p-6">
//           <h3 className="text-lg font-semibold mb-2">Featured Deals</h3>
//           <Image
//             src="https://img.freepik.com/free-photo/shopping-cart-red-bags_23-2148288209.jpg?height=200&width=200"
//             alt="Featured Deals"
//             width={200}
//             height={200}
//             className="absolute bottom-0 right-0"
//           />
//         </div>
//         <div className="relative rounded-3xl overflow-hidden bg-[#F5F5F5] p-6">
//           <h3 className="text-lg font-semibold mb-2">Trending Now</h3>
//           <Image
//             src="/placeholder.svg?height=200&width=200"
//             alt="Trending Now"
//             width={200}
//             height={200}
//             className="absolute bottom-0 right-0"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Mic, Camera, Tag } from "lucide-react";

export function HeroSection() {
  const [searchInput, setSearchInput] = useState("");

  const features = [
    { icon: Tag, label: "Location Precision" },
    { icon: Tag, label: "Budget Awareness" },
    { icon: Tag, label: "Risk Validation" },
    { icon: Tag, label: "Qualitative Products" },
  ];

  return (
    // #E8EDE3
    <section className="grid lg:grid-cols-[2fr,1fr] gap-6">
      <div className="relative rounded-3xl overflow-hidden bg-primary/10 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">
          Smart Shopping, Tailored for You
        </h2>
        <p className="text-lg mb-6 text-muted-foreground">
          Find the best deals with our AI-powered search
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full text-sm"
            >
              <feature.icon className="w-4 h-4" />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Enhanced search section */}
        <div className="space-y-4">
          <div className="relative w-full">
            <Input
              placeholder="Search for anything..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-12 pr-32 py-6 text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Camera className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Mic className="h-5 w-5" />
              </Button>
              <Button>Search</Button>
            </div>
          </div>

          {/* Upload suggestion */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Upload className="h-4 w-4" />
            <span>Drag and drop or click to upload an image</span>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 gap-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#F5F5F5] p-6">
          <h3 className="text-lg font-semibold mb-2">Featured Deals</h3>
          <Image
            src="https://img.freepik.com/free-photo/shopping-cart-red-bags_23-2148288209.jpg?height=200&width=200"
            alt="Featured Deals"
            width={200}
            height={200}
            className="absolute bottom-0 right-0"
          />
        </div>
        <div className="relative rounded-3xl overflow-hidden bg-[#F5F5F5] p-6">
          <h3 className="text-lg font-semibold mb-2">Trending Now</h3>
          <Image
            src="https://img.freepik.com/free-photo/shopping-cart-red-bags_23-2148288209.jpg?height=200&width=200"
            alt="Trending Now"
            width={200}
            height={200}
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
    </section>
  );
}
