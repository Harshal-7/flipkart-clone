import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    console.log("getUserByEmail Error : ", error);
    return null;
  }
};
