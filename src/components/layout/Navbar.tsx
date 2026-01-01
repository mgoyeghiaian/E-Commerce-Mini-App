"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/store/cart";
import type { Gender } from "@/types/product";

const GENDERS: Gender[] = ["Women", "Men", "Kids", "Teen"];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openCart = useCart((s) => s.open);
  const count = useCart((s) => s.totalItems());

  const activeGender = searchParams.get("gender");

  function setGender(g: Gender) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", g);

    const next = params.toString();
    router.replace(next ? `/?${next}` : "/", { scroll: false });
  }

  function clearGender() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("gender");

    const next = params.toString();
    router.replace(next ? `/?${next}` : "/", { scroll: false });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-wide text-gray-900">
          WEGE Mini App
        </Link>

        <div className="hidden md:flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={clearGender}
            className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm ${!activeGender
              ? "border-gray-900 text-gray-900"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
          >
            All
          </button>

          {GENDERS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm ${activeGender === g
                ? "border-gray-900 text-gray-900"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {g}
            </button>
          ))}
        </div>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
          >
            <HomeIcon fontSize="small" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
            aria-label="Go to cart"
          >
            <ShoppingCartIcon fontSize="small" />
            <span className="hidden sm:inline">Cart</span>

            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-2 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>

      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={clearGender}
            className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm ${!activeGender
              ? "border-gray-900 text-gray-900"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
          >
            All
          </button>

          {GENDERS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm ${activeGender === g
                ? "border-gray-900 text-gray-900"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
