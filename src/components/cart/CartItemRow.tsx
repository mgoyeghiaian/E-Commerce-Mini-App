"use client";

import Image from "next/image";
import type { CartItem } from "@/store/cart";
import { useCart } from "@/store/cart";

type Props = {
  item: CartItem;
};

export default function CartItemRow({ item }: Props) {
  const increase = useCart((s) => s.increase);
  const decrease = useCart((s) => s.decrease);
  const remove = useCart((s) => s.remove);

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">{item.category}</p>
          </div>

          <button
            type="button"
            onClick={() => remove(item.id)}
            className="text-xs text-gray-500 hover:text-gray-900"
          >
            Remove
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => decrease(item.id)}
              className="px-3 py-2 text-sm hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => increase(item.id)}
              className="px-3 py-2 text-sm hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className="text-sm font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
