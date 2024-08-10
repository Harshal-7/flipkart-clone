"use client";

import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/cart")}
      className="flex gap-1 lg:gap-2 items-center p-0 lg:p-2 bg-myBlue text-white font-semibold"
    >
      <ShoppingCart className="w-5 md:w-6 h-5 md:h-6" />
      <p className="hidden xl:inline-flex text-base">Cart</p>
    </Button>
  );
};

export default CartButton;
