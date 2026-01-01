import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import CartSidebar from "@/components/cart/CartSidebar";
import CartToast from "@/components/cart/CartToast";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "WEGE Mini App",
  description: "Simple WEGE Mini App with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

        <CartToast />
        <CartSidebar />
      </body>
    </html>
  );
}
