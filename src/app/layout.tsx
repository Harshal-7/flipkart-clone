import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flipkart Clone",
  description:
    "This is a flipkart clone where user can search for products, see product details page, add products to cart and wishlist with secure authentication and authorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logo_lite-cbb357.png"
        sizes="any"
      />
      <body className={cn("bg-gray-100", inter.className)}>
        <StoreProvider>
          <Header />
          {children}
          <Toaster />
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
