"use client";

import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

const CartButton = () => {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  // const quantity = useAppSelector((state) => state.cartQuantity.quantity);

  useEffect(() => {
    try {
      let cartQuantity = window.localStorage.getItem("cartQuntity");

      setQuantity(JSON.parse(cartQuantity as string));
      console.log("cartQuantity", cartQuantity);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Button
      onClick={() => router.push("/cart")}
      className="relative flex gap-1 lg:gap-2 items-center p-0 lg:p-2 bg-myBlue text-white font-semibold"
    >
      <ShoppingCart className="w-5 md:w-6 h-5 md:h-6" />
      <p className="hidden xl:inline-flex text-base">Cart</p>
      <p className="absolute left-3 top-0 bg-[#ff6161] text-white text-center font-bold rounded-[8px] px-1.5 text-[10px]">
        {quantity}
      </p>
    </Button>
  );
};

export default CartButton;
