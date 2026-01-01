"use client";

import CartPanel from "./CartPanel";
import { useCart } from "@/store/cart";

export default function CartSidebar() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 bg-black/30"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-semibold">Your Cart</p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            X
          </button>
        </div>

        <div className="p-4">
          <CartPanel />
        </div>
      </aside>
    </div>
  );
}
