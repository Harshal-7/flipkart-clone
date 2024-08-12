"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema/RegisterSchema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validateFields.data;

  try {
    const existingUserByEmail = await getUserByEmail(email);

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

    console.log("new user : ", newUser);

    return { success: "User Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
