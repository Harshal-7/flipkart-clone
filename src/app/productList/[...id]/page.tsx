"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";
import { getProductsByCategoryId } from "@/utils/products";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = ({ params }: { params: { id: any } }) => {
  const [products, setProducts] = useState<any>();
  const [data, setData] = useState<any>();
  const [activeButton, setActiveButton] = useState("Relevance");
  const [page, setPage] = useState(1);

  const sortBy = [
    { relevance: "Relevance" },
    { popularity: "Popularity" },
    { price_asc: "Price - Low to High" },
    { price_desc: "Price - High to Low" },
    { recency_desc: "Newest First" },
  ];

  useEffect(() => {
    const paramName = params.id.join(",");

    const fetchProducts = async (paramName: any) => {
      console.log("PARAM NAME : ", paramName);

      const options = {
        method: "GET",
        params: {
          category_id: `${paramName}`,
          page: "1",
        },
        url: `${process.env.BASE_URL}/products-by-category`,
        headers: {
          "x-rapidapi-key": `${process.env.API_KEY}`,
          "x-rapidapi-host": `${process.env.HOST}`,
        },
      };

      try {
        const response = await axios.request(options);
        console.log("response-data : ", response.data);
        setProducts(response.data.products);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts(paramName);
  }, []);

  const handleSorting = async (sortByValue: any, label: any) => {
    const response = await getProductsByCategoryId(
      params.id.join("/"),
      sortByValue
    );
    console.log("RESSSS : ", response);
    setProducts(response.products);
    setActiveButton(label);
  };

  if (!products) {
    return (
      <>
        <div className="w-full max-w-screen-2xl mx-auto md:mt-5 ">
          <Skeleton className="w-full p-4 py-14" />
        </div>
        <div className="w-full max-w-screen-2xl mx-auto flex justify-center items-center mt-2 ">
          <Skeleton className="w-full h-[700px]" />
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto md:mt-5 px-6 py-4">
      <div className="hidden md:flex flex-col gap-2 text-sm p-4 bg-white">
        <div className="text-xl font-bold">
          Showing {page} - {data.productsInPage} of{" "}
          {data.totalPages * data.productsInPage} result for{" "}
          {data.breadCrumbs[1].title}
        </div>
        <div className="flex items-center">
          <p className="font-semibold">Sort by</p>
          <div className="flex justify-center items-center px-4 py-2">
            {sortBy.map((val: any, i) => {
              const key = Object.keys(val)[0]; // Extract the key from the object
              const label = val[key]; // Extract the label from the object
              return (
                <button
                  key={i}
                  onClick={() => handleSorting(key, label)}
                  className={`px-2 ${
                    activeButton === label
                      ? "text-blue-500 font-bold underline underline-offset-4"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-2xl flex flex-wrap gap-y-10 gap-x-4 justify-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 mt-1 bg-white">
        {products.map((product: any, index: number) => (
          <div key={index}>
            <ItemCard product={product} />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between mt-2 p-5 bg-white mb-10">
        <div className="text-start w-1/2">
          page {page} of {data.totalPages}{" "}
        </div>
        {/* TODO : PAGES API IMPLEMENTATION  */}
      </div>
    </div>
  );
};

export default ProductList;
