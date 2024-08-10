"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  User2,
  UserCircle2,
} from "lucide-react";
import { Noto_Sans, Poppins } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";
import ProfileButton from "./ProfileButton";
import CartButton from "./CartButton";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";

const notoSans = Noto_Sans({
  weight: "800",
  style: "italic",
  subsets: ["latin"],
});

const Header = () => {
  const [inputItem, setInputItem] = useState("");

  const router = useRouter();

  const handleSearchButton = () => {
    console.log("Input : ", inputItem);
  };

  return (
    <nav className="w-full bg-myBlue">
      <div className="w-full md:max-w-6xl mx-auto flex justify-between gap-4 xl:gap-8 items-center p-4">
        <div className="inline-flex">
          <button
            onClick={() => router.push("/")}
            className={cn("text-xl lg:text-3xl text-white", notoSans.className)}
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
};

export default Header;
