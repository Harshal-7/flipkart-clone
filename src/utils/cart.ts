"use server";

import { db } from "@/lib/db";
import { getSession } from "./auth";
import { NextResponse } from "next/server";

export const AddToCart = async (product: any) => {
  const session = await getSession();
  const email = session?.user?.email || "";

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPresent = await db.cart.findFirst({
    where: {
      pid: product.pid,
    },
  });

  if (isPresent) {
    const cartProduct = await db.cart.update({
      where: {
        pid: product.pid,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    return cartProduct;
  }

  const cartProduct = await db.cart.create({
    data: {
      pid: product.pid,
      title: product.title,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      quantity: 1,
      userEmail: email,
    },
  });

  return cartProduct;
};

export const getCartItems = async () => {
  const session = await getSession();
  const email = session?.user?.email || "";

  const res = await db.cart.findMany({
    where: {
      userEmail: email,
    },
  });
  return res;
};

export const removeItemFromCart = async (id: string) => {
  const deletedProduct = await db.cart.delete({
    where: {
      pid: id,
    },
  });

  return deletedProduct;
};
