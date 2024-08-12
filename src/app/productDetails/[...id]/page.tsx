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

const ProductDetails = ({ params }: { params: { id: any } }) => {
  const [product, setProduct] = useState<any>();
  const [quantity, setQuantity] = useState(1);
  const [updateCart, setUpdateCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSpecs, setIsOpenSpec] = useState(false);
  const [imgId, setImgId] = useState(0);

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
        console.log("Data : ", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetailsAndCartStatus(itemId);
  }, [params.id]);

  // Add Item To Cart
  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        "https://ali-express-clone.onrender.com/api/cart/add",
        {
          productId: `${product.itemId}`,
          title: `${product.title}`,
          price: (product.sku.def.promotionPrice * 83).toFixed(2),
          image: `${product.images[0]}`,
          quantity: quantity,
          size: "m",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
      toast({
        title: "Item added to cart",
        className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
      });
    } catch (error) {
      console.log("ERROR adding to cart : ", error);
    }
    setUpdateCart(true);
  };

  // Update item quantity inside cart
  const handleUpdateCart = async () => {
    try {
      const res = await axios.patch(
        `https://ali-express-clone.onrender.com/api/cart/${product.itemId}`,
        {
          productId: `${product.itemId}`,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );

      toast({
        title: "Cart updated successfully",
        className: "text-red-600 bg-white hover:bg-gray-100 font-bold",
      });
    } catch (error) {
      console.log("ERROR updating cart : ", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const res = await axios.delete(
        `https://ali-express-clone.onrender.com/api/wishlist/removeone/${product.itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
      console.log("remove wishlist : ", res);
    } catch (error) {
      console.log("ERROR removing from wishlist : ", error);
    }
  };

  const handleWishList = async () => {
    if (isAddedToWishlist) {
      handleRemoveFromWishlist();
      return;
    }
    try {
      await axios.post(
        "https://ali-express-clone.onrender.com/api/wishlist/add",
        {
          productId: `${product.itemId}`,
          title: `${product.title}`,
          price: (product.sku.def.promotionPrice * 83).toFixed(2),
          image: `${product.images[0]}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: document.cookie,
          },
        }
      );
    } catch (error) {
      console.log("ERROR adding to wishlist : ", error);
    }
    setUpdateCart(true);
    setIsAddedToWishlist(true);
  };

  const handleClick = (e: any) => {
    e.currentTarget.disabled = true;
  };

  if (!product) {
    return <div>...</div>;
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
            {product.images.map((item: any, index: number) => (
              <CarouselItem key={index}>
                <Card className="border-none flex shadow-none rounded-xl">
                  <CardContent
                    onClick={() => setImgId(index)}
                    className="flex items-center justify-center overflow-hidden w-20 border p-2"
                  >
                    <img
                      src={item}
                      alt="img"
                      className="w-fit h-fit max-h-20 object-cover object-center rounded-xl"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="w-full h-fit flex flex-col gap-10 justify-center items-start px-8 overflow-hidden mt-4">
          <img
            className="w-fit h-fit max-w-[340px] max-h-[420px] hover:scale-105 transition-transform duration-500"
            src={`${product.images[imgId]}`}
            alt="product-image"
          />
          <div className="flex gap-4 w-full">
            <button className="bg-[#ff9f00] text-white font-bold w-full flex items-center justify-center px-4 py-4 gap-2 hover:bg-[#ff9f00]/90">
              <ShoppingCart fill="white" className="w-6 h-6" />
              <p> Add to cart</p>
            </button>
            <button className="bg-[#fb641b] text-white font-bold w-full flex items-center justify-center px-4 py-4 gap-2 hover:bg-[#fb641b]/90 ">
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
          {product.title}
        </div>
        {/* Product Rating & Reviews Count  */}
        <div className="flex items-center gap-2 font-bold my-1">
          <div className="bg-green-700/90 text-white rounded-sm px-2 py-1 text-[10px]">
            {product.rating.overall.average} ★
          </div>
          <div className="text-gray-400 text-sm my-1">
            {product.rating.overall.count} Ratings &{" "}
            {product.rating.overall.reviewCount} Reviews
          </div>
        </div>

        {/* Price & discount  */}
        <div className="flex items-center gap-2.5">
          <div className="text-2xl font-semibold">₹{product.price}</div>
          <div className="line-through text-gray-400 text-base">
            ₹{product.mrp}
          </div>
          <div className="text-base text-green-600 font-semibold">
            {discount}% off
          </div>
        </div>

        {/* Available offers */}
        {product.offers.length > 0 && (
          <div className="flex flex-col text-sm relative">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
              <div className="flex items-center">
                <h4 className="text-sm font-semibold my-1">Available Offers</h4>

                <CollapsibleTrigger asChild>
                  <button className="absolute -bottom-6 left-0 text-blue-500 font-semibold">
                    {isOpen ? (
                      <>View less</>
                    ) : (
                      <>View {product.offers.length} more offers</>
                    )}
                  </button>
                </CollapsibleTrigger>
              </div>

              {product.offers.map((offer: any, i: number) => (
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

            {product.offers.map((offer: string, i: number) => (
              <div key={i}></div>
            ))}
          </div>
        )}

        {/* Highlights  */}
        {product.highlights && (
          <div className="flex flex-col gap-2 mt-10">
            <div className="text-muted-foreground font-bold tracking-wide">
              Highlights
            </div>
            <ul className="flex flex-col gap-2 px-6 text-sm">
              {product.highlights.map((desc: any, i: number) => (
                <li key={i} className="list-disc">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        )}

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
