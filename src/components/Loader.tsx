"use client";

import { LoaderCircle, Search } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[650px] flex gap-2 justify-center items-center text-2xl font-semibold text-blue-500">
      <span className="">Loading Products</span>
      <LoaderCircle className="w-7 h-7 animate-spin " />
    </div>
  );
};

export default Loader;
