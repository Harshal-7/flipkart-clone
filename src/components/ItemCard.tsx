"use client";

import React from "react";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const ItemCard = ({ product }: { product: any }) => {
  const discount = (
    ((product.mrp - product.price) / product.mrp) *
    100
  ).toFixed(0);

  return (
    <div className="flex flex-col gap-2 md:gap-0 group hover:text-blue-600 relative w-[250px] h-full md:w-[220px] xl:w-[280px] overflow-hidden group bg-white hover:shadow-lg transition-all duration-300">
      {/* Product-Image */}
      <div className="relative w-[240px] xl:w-[280px] h-full max-h-[280px] xl:max-h-[340px] self-center overflow-hidden group">
        <Link href={`/productDetails/${product.pid}`}>
          <img
            src={product.images[0]}
            alt="img"
            className="h-full mx-auto object-contain p-6 hover:scale-105 transition-all duration-500"
          />
        </Link>
      </div>

      {/* Product-Description */}
      <div className="flex flex-col h-[122px] items-center md:px-4 md:py-2 text-sm text-center flex-grow">
        {/* TITLE */}
        <HoverCard>
          <HoverCardTrigger className="line-clamp-2 flex-1">
            <Link
              href={`/productDetails/${product.pid}`}
              className="text-sm text-center flex-grow"
            >
              {product.title}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/80 text-white p-2 text-start">
            {product.title}
          </HoverCardContent>
        </HoverCard>

        {/* RATING */}
        <div className="flex items-center gap-2 font-bold  mt-2">
          <div className="bg-green-700/90 text-white rounded-sm px-2 py-1 text-[12px]">
            {product.rating.average} ★
          </div>
          <div className="text-gray-500 text-sm">({product.rating.count})</div>
        </div>

        {/* PRICE - DISCOUNT */}
        <div className="flex items-center gap-2 text-black mt-2">
          <div className="flex items-center">
            <span className=""> ₹{product.price}</span>
          </div>
          <div className="flex items-center line-through text-muted-foreground font-normal text-[14px]">
            <span className="">₹{product.mrp}</span>
          </div>
          <div className="text-xs text-green-600 font-semibold">
            {discount}% off
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
