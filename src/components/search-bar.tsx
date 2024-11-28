import { useState } from "react";
import { Input } from "./ui/input";
import { ImageIcon, Mic, Search } from "lucide-react";
import { Button } from "./ui/button";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="relative w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Search for anything..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full pl-10 pr-20"
      />
      <div className="absolute inset-y-0 left-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ImageIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
