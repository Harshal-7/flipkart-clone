"use client";

import HomeProducts from "@/components/HomeProducts";
import ItemCard from "@/components/ItemCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full ">
      <HomeProducts />
    </div>
  );
}
