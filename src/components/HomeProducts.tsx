"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ItemCard from "./ItemCard";

const shuffleArray = (array: Array<object>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const HomeProducts = () => {
  const [homeProducts, setHomeProducts] = useState<any>();
  const [homeTopbarProducts, setHomeTopbarProducts] = useState<any>();

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const homeProductsResponse = await axios.get(
        "https://api.jsonbin.io/v3/b/66be6578acd3cb34a8751acc"
      );

      const homeTopbarProductsResponse = await axios.get(
        "https://api.jsonbin.io/v3/b/66be643dad19ca34f8969bc3"
      );

      setHomeProducts(shuffleArray(homeProductsResponse.data.record));
      setHomeTopbarProducts(homeTopbarProductsResponse.data.record);
    };
    fetchHomeProducts();
  }, []);

  if (!homeTopbarProducts && !homeProducts) {
    return <div></div>;
  }

  return (
    <>
      <Topbar homeTopbarProducts={homeTopbarProducts} />
      <Bottombar homeProducts={homeProducts} />
    </>
  );
};

//  Topbar Products Component
const Topbar = ({ homeTopbarProducts }: any) => {
  const router = useRouter();

  const handleHomeTopbarProducts = (item: any) => {
    router.push(`/productSearch/${item.href}`);
  };

  return (
    <div className="w-full h-28 lg:h-36 xl:max-w-screen-2xl flex px-4 lg:justify-center items-center overflow-auto lg:gap-4 bg-white mt-4">
      {homeTopbarProducts?.map((item: any, i: number) => (
        <div
          className="flex flex-col gap-1 justify-center items-center w-40 h-full lg:h-10"
          key={i}
        >
          <button
            onClick={() => handleHomeTopbarProducts(item)}
            className="flex flex-col justify-center items-center text-xs px-3 lg:text-base w-20 lg:w-full h-20 lg:h-full"
          >
            <img
              className="flex-grow object-contain"
              src={item.img}
              alt="img"
            />
            <p className="line-clamp-1 lg:line-clamp-none">{item.name}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

//  Topbar Products Component
const Bottombar = ({ homeProducts }: any) => {
  return (
    <div className="w-full xl:max-w-screen-2xl flex flex-wrap md:gap-y-10 gap-x-4 justify-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 mt-2 bg-white">
      {homeProducts?.map((product: any, index: number) => (
        <div key={index}>
          <ItemCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;
