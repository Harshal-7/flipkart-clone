"use client";

import ItemCard from "@/components/ItemCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const shuffleArray = (array: Array<object>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Home() {
  const [homeProducts, setHomeProducts] = useState<any>();
  const [homeTopbarProducts, setHomeTopbarProducts] = useState<any>();

  const router = useRouter();

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

  const handleHomeTopbarProducts = (item: any) => {
    router.push(`/productSearch/${item.href}`);
  };

  if (!homeTopbarProducts && !homeProducts) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full ">
      <div className="w-full h-36 max-w-screen-2xl flex justify-center items-center gap-4 bg-white mt-4">
        {homeTopbarProducts?.map((item: any, i: number) => (
          <div
            className="flex flex-col gap-1 justify-center items-center w-full h-10"
            key={i}
          >
            <button
              onClick={() => handleHomeTopbarProducts(item)}
              className="flex flex-col justify-center items-center"
            >
              <img src={item.img} alt="img" />
              <p>{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="w-full max-w-screen-2xl flex flex-wrap gap-y-10 gap-x-4 justify-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 mt-2 bg-white">
        {homeProducts?.map((product: any, index: number) => (
          <div key={index}>
            <ItemCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
