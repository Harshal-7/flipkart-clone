"use client";

import { Heart, LogOut, UserCircle2 } from "lucide-react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex gap-1 lg:gap-2 items-center p-0 lg:p-2 rounded-lg bg-myBlue text-white font-semibold border-0">
            <UserCircle2 className="w-5 md:w-6 h-5 md:h-6" />
            <p className="hidden sm:inline-flex lg:text-base">Harshal</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-lg gap-1 xl:gap-4">
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-blue-600 text-white xl:text-lg font-semibold hover:bg-blue-600/90 px-2 lg:px-4 xl:px-6"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="text-blue-600 xl:text-lg font-semibold hover:bg-blue-600/10 px-2 lg:px-4 xl:px-6"
                >
                  Sign Up
                </Button>
              </div>
              <hr className="mt-2" />
              {/* IF NOT-AUTHENTICATED THEN REDIRECT TO LOGIN-PAGE */}
              <Button className="flex gap-2 justify-start items-center hover:bg-gray-100">
                <Heart className="w-4 h-4" />
                Wishlist
              </Button>

              {/* IF AUTHENTICATED THEN DISPLAY ELSE HIDE */}
              <Button className="flex gap-2 justify-start items-center hover:bg-gray-100">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProfileButton;
