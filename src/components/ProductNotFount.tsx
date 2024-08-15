"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProductNotFount = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[350px] flex flex-col items-center justify-center gap-4">
      <div>Product not available right now!</div>
      <button
        onClick={() => router.back()}
        className="bg-orange-600 text-white font-semibold px-6 py-3 w-32"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProductNotFount;
