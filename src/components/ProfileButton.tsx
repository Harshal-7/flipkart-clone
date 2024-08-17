"use client";

import { Heart, LogOut, UserCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { signOut } from "@/auth";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { setAuthState } from "@/lib/store/features/authSlice";
import { getSession, signout } from "@/utils/auth";
import Link from "next/link";
import {
  removeMySession,
  setMySession,
} from "@/lib/store/features/sessionSlice";

const ProfileButton = () => {
  // dispatch: used to set-auth-state in redux store so we can access the authentication state everywhere
  const dispatch = useAppDispatch();
  // getting the authenticated state value from redux store
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // get user session from redux-state
  const session = useAppSelector((state) => state.session.mySession);
  // set username from session.name
  const [userName, setUserName] = useState<any>();

  useEffect(() => {
    // fetching the session value from server-side and setting isAuthenticated state
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user) {
        dispatch(setAuthState(true));
        dispatch(setMySession(session));
        setUserName(session.user.name);
      }
    };
    fetchSession();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("session : ", session);
    console.log("name : ", userName);
  }, [session]);

  // signing out user and setting isAuthenticated state to false;
  const handleSignOut = async () => {
    dispatch(setAuthState(false));
    dispatch(removeMySession());
    await signout();
  };

  const router = useRouter();

  return (
    <NavigationMenu className="z-[999]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex gap-1 lg:gap-2 items-center p-0 lg:p-2 rounded-lg bg-myBlue text-white font-semibold border-0 z-[99]">
            <UserCircle2 className="w-6 h-6" />
            <p className="hidden sm:inline-flex lg:text-base">
              {userName ? userName : "User"}
            </p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-col sm:flex-row justify-center items-center text-lg gap-1 xl:gap-4">
                {isAuthenticated ? (
                  <Button
                    onClick={handleSignOut}
                    className="w-full flex gap-2 justify-start items-center bg-blue-600 text-white xl:text-lg font-semibold hover:bg-blue-600/90 px-2 lg:px-4 xl:px-8"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => router.push("/login")}
                      className="w-full bg-blue-600 text-white xl:text-lg font-semibold hover:bg-blue-600/90 px-2 lg:px-4 xl:px-6"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => router.push("/register")}
                      className="w-full text-blue-600 xl:text-lg font-semibold hover:bg-blue-600/10 px-2 lg:px-4 xl:px-6"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
              <hr className="mt-2" />
              {/* IF NOT-AUTHENTICATED THEN REDIRECT TO LOGIN-PAGE */}
              <Link
                href="/wishlist"
                className="flex gap-2 p-2 justify-start items-center hover:bg-gray-100"
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProfileButton;
