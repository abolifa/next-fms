import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const GlobalSearch = () => {
  return (
    <div className="px-2 w-full relative">
      <Input
        type="text"
        placeholder="ابحث هنا..."
        className="w-full border rounded-full px-4 pr-8"
      />
      <Search className="absolute h-4 w-4 right-5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default GlobalSearch;
