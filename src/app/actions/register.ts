"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema/RegisterSchema";
import bcrypt from "bcryptjs";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validateFields.data;

  try {
    const existingUserByName = await db.user.findUnique({
      where: {
        name,
      },
    });

    if (existingUserByName) {
      return { error: "User already exist with this name" };
    }

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return { error: "User already exist with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("NEW USER : ", newUser);

    return { success: "User Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
