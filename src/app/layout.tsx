import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecommerce Demo",
  description: "Simple ecommerce-style demo with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold tracking-wide">
              E-Commerce Mini App
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link href="/cart" className="hover:text-gray-600">
                Cart
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
