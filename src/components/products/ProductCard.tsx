"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@/store/cart";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const showToast = useCart((s) => s.showToast);

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
      >

        <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-2xl bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500">{product.category}</p>

          <h3 className="mt-1 text-sm font-medium leading-snug text-gray-900 line-clamp-2">
            {product.title}
          </h3>

          <p className="mt-2 text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => {
            add(product, 1);
            showToast("Product added to cart");
            open();
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
        >
          <AddShoppingCartIcon fontSize="small" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
