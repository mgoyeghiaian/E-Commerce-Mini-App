"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";

type Props = { product: Product };

export default function AddToCartButton({ product }: Props) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const showToast = useCart((s) => s.showToast);

  return (
    <button
      type="button"
      onClick={() => {
        add(product, 1);
        showToast("Product added to cart");
        open();
      }}
      className="w-full sm:w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400 hover:cursor-pointer "
    >
      Add to cart
    </button>
  );
}
