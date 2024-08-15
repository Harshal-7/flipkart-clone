"use client";

import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  Heart,
  Lock,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCartItems } from "@/lib/store/features/cartSlice";
import { Rating } from "@/components/Rating";
import { useRouter } from "next/navigation";
import ProductNotFount from "@/components/ProductNotFount";

const ProductDetails = ({ params }: { params: { id: any } }) => {
  const [product, setProduct] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [imgId, setImgId] = useState(0);

  const router = useRouter();

  //redux-state
  const dispatch = useAppDispatch();

  const discount = (
    ((product?.mrp - product?.price) / product?.mrp) *
    100
  ).toFixed(0);

  const { toast } = useToast();

  useEffect(() => {
    // API call to fetch product details
    const itemId = params.id[0];

    const fetchProductDetailsAndCartStatus = async (itemId: any) => {
      const options = {
        method: "GET",
        url: "https://real-time-flipkart-api.p.rapidapi.com/product-details",
        params: {
          pid: `${itemId}`,
        },
        headers: {
          "x-rapidapi-key":
            "8fd9fec7d6msh253b64b0b38c2abp1ddf82jsn09344b5aaefc",
          "x-rapidapi-host": "real-time-flipkart-api.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setProduct(response.data);
        console.log("Product-info : ", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetailsAndCartStatus(itemId);
  }, [params.id]);

  // Add Item To Cart
  const handleAddToCart = async () => {
    console.log("added to cart : ", product);
    dispatch(setCartItems(product));
    router.push("/cart");
  };

  if (!product) {
    return <div>...</div>;
  }

  if (product.error) {
    return <ProductNotFount />;
  }

  return (
    <div className="w-full max-w-screen-xl min-h-screen flex mx-auto bg-white relative">
      {/* Product image  */}
      <div className="w-[40%] flex mt-5 h-fit sticky top-5">
        {/* Product image coursel  */}
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-fit group pl-2 flex"
          orientation="vertical"
        >
          <CarouselContent>
            {product?.images.map((item: any, index: number) => (
              <CarouselItem key={index}>
                <div
                  onClick={() => setImgId(index)}
                  className="flex w-20 h-20 border"
                >
                  <img
                    src={item}
                    alt="img"
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* PRODUCT IMG, ADD TO CART & BUY NOW  */}
        <div className="w-full h-fit flex flex-col gap-10 justify-center items-start px-8 overflow-hidden mt-4">
          <img
            className="w-fit h-fit self-center max-w-[340px] max-h-[420px] hover:scale-105 transition-transform duration-500"
            src={`${product?.images[imgId]}`}
            alt="product-image"
          />
          <div className="flex gap-4 w-full">
            <button
              onClick={handleAddToCart}
              className="font-bold w-full flex items-center justify-center px-3 py-4 gap-2 bg-[#ff9f00] text-white hover:bg-[#ff9f00]/90"
            >
              <ShoppingCart fill="white" className="w-6 h-6" />
              <p> Add to cart</p>
            </button>
            <button className="font-bold w-full flex items-center justify-center px-3 py-4 gap-2 bg-[#fb641b] text-white hover:bg-[#fb641b]/90 ">
              <Zap fill="white" className="w-6 h-6" />
              <p>Buy Now</p>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info  */}
      <div className="w-[60%] flex flex-col gap-2">
        {/* Product Title  */}
        <div className="text-xl font-bold mt-5 tracking-wide">
          {product?.title}
        </div>
        {/* Product Rating & Reviews Count  */}
        <div className="flex items-center gap-2 font-bold my-1">
          <div className="bg-green-700/90 text-white rounded-sm px-2 py-1 text-[10px]">
            {product?.rating.overall.average} ★
          </div>
          <div className="text-gray-400 text-sm my-1">
            {product?.rating.overall.count} Ratings &{" "}
            {product?.rating.overall.reviewCount} Reviews
          </div>
        </div>
        {/* Price & discount  */}
        <div className="flex items-center gap-2.5">
          <div className="text-2xl font-semibold">₹{product?.price}</div>
          <div className="line-through text-gray-400 text-base">
            ₹{product?.mrp}
          </div>
          <div className="text-base text-green-600 font-semibold">
            {discount}% off
          </div>
        </div>
        {/* Available offers */}
        {product?.offers.length > 0 && (
          <div className="flex flex-col text-sm relative">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
              <div className="flex items-center">
                <h4 className="text-sm font-semibold my-1">Available Offers</h4>

                <CollapsibleTrigger asChild>
                  <button className="absolute -bottom-6 left-0 text-blue-500 font-semibold">
                    {isOpen ? (
                      <>View less</>
                    ) : (
                      <>View {product?.offers.length} more offers</>
                    )}
                  </button>
                </CollapsibleTrigger>
              </div>

              {product?.offers.map((offer: any, i: number) => (
                <div key={i}>
                  {i < 4 ? (
                    <div className="flex gap-2 items-center py-1.5 text-sm">
                      <Tag fill="green" className="w-4 h-4 text-white" />
                      {offer}
                    </div>
                  ) : (
                    <CollapsibleContent className="space-y-2">
                      <div className="py-1.5 text-sm">{offer}</div>
                    </CollapsibleContent>
                  )}
                </div>
              ))}
            </Collapsible>

            {product?.offers.map((offer: string, i: number) => (
              <div key={i}></div>
            ))}
          </div>
        )}
        {/* Highlights  */}
        {product?.highlights && (
          <div className="flex flex-col gap-2 mt-10">
            <div className="text-muted-foreground font-bold tracking-wide">
              Highlights
            </div>
            <ul className="flex flex-col gap-2 px-6 text-sm">
              {product?.highlights.map((desc: any, i: number) => (
                <li key={i} className="list-disc">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ratings And Reviews */}
        <div className="p-6 border mt-5">
          {/* title on component  */}
          <div className="text-2xl font-bold tracking-wide">
            Ratings & Reviews
          </div>

          <hr className="my-4" />

          <div className="flex flex-col gap-8">
            {/* Rating  */}
            <div className="flex gap-4 mt-4 px-2">
              {/* review & rating overall count  */}
              <div className="flex flex-col gap-1 w-full max-w-[120px]">
                <div className="text-3xl">
                  {product?.rating.overall.average} ★
                </div>
                <div className="text-sm text-muted-foreground">
                  {product?.rating?.overall?.count} Ratings &
                </div>
                <div className="text-sm text-muted-foreground">
                  {product?.rating?.overall?.reviewCount} Reviews
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <Rating rating={product?.rating} />
              </div>
            </div>

            <hr />
            {/* Reviews */}

            {product?.reviews.slice(0, 3).map((_: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-2">
                  {/* rating & title  */}
                  <div className="flex gap-2 w-full justify-start items-center font-bold">
                    <div className="bg-green-700/90 text-white rounded-sm px-2 py-1 text-xs">
                      {_.rating} ★
                    </div>
                    <div> {_.title}</div>
                  </div>

                  {/* full review  */}
                  <div>{_.review}</div>

                  {/* review with image  */}
                  <div className="flex">
                    {_.images.slice(0, 5).map((img: any, index: any) => (
                      <div className="w-36 h-32" key={index}>
                        <img
                          src={img}
                          alt="img"
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* reviewr description - name,date,location,upvotes,downvotes  */}
                  <div className="w-full flex justify-between items-center text-xs font-bold text-muted-foreground">
                    <div className="flex gap-2">
                      <div>{_.reviewer}</div>
                      <div>{_.location}</div>
                      <div className="font-semibold">{_.date}</div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <div>{_.upvotes}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="w-4 h-4" />
                        <div>{_.downvotes}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {index !== 2 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Specifications  */}
        <div className="p-4 border mt-2">
          <div className="text-2xl font-bold tracking-wide pt-4">
            Specifications
          </div>

          <hr className="mt-5" />

          {Object.entries(product.specifications).map(
            ([category, specs]: any, categoryIndex: any) => (
              <div key={categoryIndex} className="my-2">
                {/* Secification category */}
                <div className="text-xl py-4">{category}</div>

                <div className="grid grid-cols-4 gap-3.5 text-sm">
                  {Object.entries(specs).map(
                    ([key, value]: any, index: any) => (
                      <React.Fragment key={index}>
                        {/* specifications key  */}
                        <div className="font-semibold text-muted-foreground">
                          {key}
                        </div>

                        {/* specifications value  */}
                        <div className="text-start col-span-3">
                          {Array.isArray(value) ? value.join(", ") : value}
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div>
                <hr className="mt-5" />
              </div>
            )
          )}

          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
