"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

const SearchBar = () => {
  const [inputItem, setInputItem] = useState("");
  const router = useRouter();

  const handleSearchButton = (e: any) => {
    const productName = inputItem;
    setInputItem("");
    router.push(`/productSearch/${productName}`);
  };

  return (
    <>
      <Input
        value={inputItem}
        onChange={(e) => setInputItem(e.target.value)}
        className="w-full md:px-3 md:py-2 bg-slate-100 border-none "
        placeholder="Search for Products, Brands and More"
      />
      <button onClick={handleSearchButton}>
        <Search className="w-4 md:w-5 h-4 md:h-5 absolute right-4 top-3 md:top-2.5" />
      </button>
    </>
  );
};

export default SearchBar;
