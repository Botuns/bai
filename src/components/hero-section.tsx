"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Search, Camera, Mic, Upload, ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countries } from "@/lib/countries";
import {
  QueryParams,
  refineUserQuery,
} from "@/app/services/prompt-refine.service";
import { toast } from "sonner";
import { searchDeals } from "@/app/services/get-deals";

type BudgetType = "very_cheap" | "economical" | "normal" | "luxury";

const budgetOptions: { value: BudgetType; label: string }[] = [
  { value: "very_cheap", label: "Very Cheap" },
  { value: "economical", label: "Economical" },
  { value: "normal", label: "Normal" },
  { value: "luxury", label: "Luxury" },
];

const conditionOptions = ["New", "Used", "Any"];

export function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  const [budget, setBudget] = useState<BudgetType>("normal");
  const [location, setLocation] = useState("global");
  const [condition, setCondition] = useState("New");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const countryNames = data
  //         .map((country: { name: { common: string } }) => country.name.common)
  //         .sort();
  //       setCountries(["global", ...countryNames]);
  //     });
  // }, []);

  const features = [
    { icon: Tag, label: "Location Precision" },
    { icon: Tag, label: "Budget Awareness" },
    { icon: Tag, label: "Risk Validation" },
    { icon: Tag, label: "Qualitative Products" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Search for:", searchInput);
    }
  };
  async function handleSearch() {
    setIsLoading(true);
    const queryParams: QueryParams = {
      originalQuery: searchInput,
      budget,
      location,
      brandCondition: condition,
      additionalContext: {},
    };
    try {
      const response = await refineUserQuery(queryParams);
      if (response.refined_query) {
        const deals = await searchDeals(response.refined_query);
        console.log("Deals:", deals);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error refining query:", error);
    } finally {
      setIsLoading(false);
    }
  }

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
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="relative w-full">
            <Input
              placeholder="Search for anything..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-12 pr-32 py-6 text-lg rounded-lg"
              onKeyDown={handleKeyDown}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Camera className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Mic className="h-5 w-5" />
              </Button>
              <Button onClick={handleSearch} className="rounded-lg">
                {isLoading ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-2">🔄</span>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select
              value={budget}
              onValueChange={(value: BudgetType) => setBudget(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  {location === "global"
                    ? "Select location"
                    : countries.find((c) => c.code === location)?.name ||
                      location}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="max-h-[300px] overflow-auto">
                  {countries.map((country) => (
                    <Button
                      key={country.code}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => setLocation(country.code)}
                    >
                      {country.name}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
