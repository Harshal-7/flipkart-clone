import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema/LoginSchema";
import Github from "next-auth/providers/github";
import bcrypt from "bcryptjs";

export default {
  providers: [Credentials({})],
} satisfies NextAuthConfig;
