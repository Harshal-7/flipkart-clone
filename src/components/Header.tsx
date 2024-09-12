"use client";

import { cn } from "@/lib/utils";

import { Noto_Sans } from "next/font/google";
import React, { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import CartButton from "./CartButton";
import { useRouter } from "next/navigation";
import SearchBar, { SearchBarMobileScreen } from "./SearchBar";
import axios from "axios";
import CategoryTree from "./CategoryTree";

const notoSans = Noto_Sans({
  weight: "800",
  style: "italic",
  subsets: ["latin"],
});

const Header = () => {
  const [categories, setCategories] = useState<any>();

  const router = useRouter();

  // Fetching Categories-List from api and assigning to state
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/66bdffaead19ca34f8967a9f"
        );
        setCategories(response.data?.record);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  if (!categories) {
    return (
      <nav className="w-full bg-myBlue">
        <div className="w-full md:max-w-6xl mx-auto flex justify-between gap-4 xl:gap-8 items-center p-4">
          <div className="inline-flex">
            <button
              onClick={() => router.push("/")}
              className={cn(
                "text-xl lg:text-3xl text-white",
                notoSans.className
              )}
            >
              Flipkart
            </button>
          </div>
          <div className="relative flex items-center flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <ProfileButton />
            <CartButton />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-myBlue">
      {/* Top Navbar */}
      <div className="w-full md:max-w-6xl mx-auto flex justify-between gap-4 xl:gap-8 items-center py-2 px-6 sm:p-4">
        <div className="inline-flex">
          <button
            onClick={() => router.push("/")}
            className={cn(
              "text-2xl lg:text-3xl text-white",
              notoSans.className
            )}
          >
            Flipkart
          </button>
        </div>
        {/* Search-bar Component For Large-Screens  */}
        <div className="hidden sm:flex items-center flex-1 relative ">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 sm:gap-2">
          {/* Sign-in Sign-out Component  */}
          <ProfileButton />
          {/* Cart Component  */}
          <CartButton />
        </div>
      </div>

      {/* Search-bar Component For Mobile-Screens  */}
      <div className="sm:hidden flex items-center relative px-4 pb-2 bg-myBlue">
        <SearchBarMobileScreen />
      </div>

      {/* Bottom Categories Navbar */}
      <div className="hidden sm:flex lg:justify-center items-center gap-4 xl:gap-8 p-2 w-full bg-white shadow-sm">
        <CategoryTree CategoryList={categories} />
      </div>
    </nav>
  );
};

export default Header;
