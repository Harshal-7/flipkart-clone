"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoIcon, ShoppingCart, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { selectAuthState, setAuthState } from "@/lib/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const CartPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<any>();
  const [totalCost, setTotalCost] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);

  // get all products from cart-redux-store and add them to state
  useEffect(() => {
    try {
      let myData: string | null = localStorage.getItem("cartItem");

      if (myData === null || myData === "[]") {
        myData = JSON.stringify([]); // Convert empty array to a string representation
      }
      setItems(JSON.parse(myData));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // update total cost after adding products to state
  useEffect(() => {
    let mrp = 0;
    let price = 0;
    if (items) {
      items.forEach((item: any) => {
        mrp += item.mrp;
        price += item.price;
      });
    }
    setTotalCost(price);
    setTotalMrp(mrp);
  }, [items, totalCost]);

  // Go to product-detail page
  const handleProductInfo = (item: any) => {
    const id = item.pid;
    router.push(`/productDetails/${id}`);
  };

  return (
    <div className="w-full md:max-w-7xl md:mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-5 md:mt-10 mb-10">
      <Card className="w-full max-w-5xl">
        <CardHeader className="pb-0 flex flex-row justify-between items-center">
          <CardTitle className="">
            Shopping Cart ({items ? items.length : 0})
          </CardTitle>
          {items && items.length > 0 && (
            <CardDescription className="inline-flex text-start hover:text-red-500">
              <button className="">Remove All Products</button>
            </CardDescription>
          )}
        </CardHeader>
        <hr className="my-6" />
        <CardContent className="flex flex-col gap-6 mt-6">
          {/* Check if cart is empty or not based on that show the component */}
          {items && items.length > 0 ? (
            items.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex items-center md:items-start gap-8">
                  <div className="w-20 md:w-32 h-20 md:h-32 relative rounded-md flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt="img"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  {/* item information and price  */}
                  <div className="flex flex-col gap-2 flex-1">
                    {/* item title  */}
                    <button
                      onClick={() => handleProductInfo(item)}
                      className="text-start mb-2"
                    >
                      <div className="line-clamp-1">{item.title}</div>
                    </button>

                    {/* mrp, price, discount and offers  */}
                    <div className="flex items-center gap-2.5">
                      <div className="line-through text-gray-400 text-base">
                        ₹{item.mrp}
                      </div>
                      <div className="text-2xl font-semibold">
                        ₹{item.price}
                      </div>
                      <div className="text-base text-green-600 font-semibold">
                        {(
                          ((item?.mrp - item?.price) / item?.mrp) *
                          100
                        ).toFixed(0)}
                        % off
                      </div>
                      {item.offers && (
                        <div className="text-sm text-green-600 font-semibold flex gap-1 items-center">
                          {item.offers.length} offers available{" "}
                          <InfoIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* dilivery charges  */}
                    <div className="text-sm -space-y-4">
                      + ₹59 Delivery Charges
                    </div>
                  </div>

                  {/* remove item from cart  */}
                  <button className="p-2 font-semibold">REMOVE</button>
                </div>
                <hr className="p-0 m-0" />
              </React.Fragment>
            ))
          ) : (
            // If cart is empty then show empty-cart
            <div className="flex flex-col justify-center items-center gap-10">
              <ShoppingCart className="w-56 h-56 text-gray-300" />
              <div className="font-bold text-xl text-center">
                No items yet? Continue shopping to explore more.
              </div>
              <Link
                href="/"
                className="px-5 py-3  rounded-3xl bg-red-500 text-white hover:scale-105 hover:bg-red-600 hover:font-bold transition-all duration-300"
              >
                Explore More Items
              </Link>
            </div>
          )}
        </CardContent>

        {/* PLACE ORDER BUTTON  */}
        <div className="w-full flex justify-end sticky bottom-0 bg-white p-4 shadow-[2px_-5px_10px_0px_#00000014]">
          <button className="w-52 px-5 py-3  bg-[#fb641b] text-white font-bold hover:font-extrabold transition-all duration-300">
            PLACE ORDER ({items ? items.length : 0})
          </button>
        </div>
      </Card>

      {/* SUMMARY / TOTAL-COST */}
      {items && items.length > 0 ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-bold text-muted-foreground">
              Price details
            </CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="flex flex-col gap-5 mt-10">
            <div className="flex justify-between">
              <div>Price ({items ? items.length : 0} items) </div>
              <div className="">₹{totalMrp.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
              <div>Discount</div>
              <div className=" text-green-600">- ₹{totalMrp - totalCost}</div>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-xl">
              <div>Total Ammount </div>
              <div className="">₹{totalCost}</div>
            </div>
            <hr />
            <div className="font-semibold text-base text-green-600">
              You will save ₹{totalMrp - totalCost} on this items{" "}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartPage;
