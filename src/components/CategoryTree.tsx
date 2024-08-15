"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

const CategoryTree = ({ CategoryList }: any) => {
  const router = useRouter();

  const handleSubCategory = (id: any) => {
    console.log("ID : ", id);
    router.push(`/productList/${id}`);
  };

  const renderSubCategory = (subCategory: any) => {
    return (
      <div key={subCategory.id} className="text-sm space-y-3">
        <button
          onClick={() => handleSubCategory(subCategory.id)}
          className="font-semibold"
        >
          {subCategory.title}
        </button>
        {Object.keys(subCategory.children).length > 0 && (
          <div className="flex flex-col text-muted-foreground gap-y-3">
            {Object.values(subCategory.children).map(
              (subSubCategory: any, id) => (
                <button
                  onClick={() => handleSubCategory(subCategory.id)}
                  key={id}
                  className="text-sm text-start"
                >
                  <p className="font-medium ">{subSubCategory.title}</p>
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.values(CategoryList).map((category: any) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="">
              {category.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              onClick={(e) => e.target.removeEventListener}
              className="p-4 min-w-[400px] lg:min-w-[550px] xl:min-w-max max-h-[600px] flex flex-col flex-wrap gap-5 gap-x-8 overflow-auto"
            >
              {Object.values(category.children).map((subCategory) =>
                renderSubCategory(subCategory)
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CategoryTree;
