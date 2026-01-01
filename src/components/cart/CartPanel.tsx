"use client";

import { useMemo } from "react";
import { useCart } from "@/store/cart";
import CartItemRow from "./CartItemRow";

export default function CartPanel() {
  const itemsMap = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.totalPrice());

  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-sm rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-semibold">${total.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
