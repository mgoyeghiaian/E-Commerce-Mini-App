"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartButton() {
  const count = useCart((s) => s.totalItems());

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
    >
      Cart
      {count > 0 && (
        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-2 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
