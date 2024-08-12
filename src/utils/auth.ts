"use server";

import { auth, signOut } from "@/auth";

// getting session from auth() and returing the session value
export const getSession = async () => {
  const session = await auth();
  return session;
};

// sign out function used on client-side component
export const signout = async () => {
  await signOut();
};
