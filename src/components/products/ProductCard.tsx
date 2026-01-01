"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
    >
      <div className="relative h-44 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-500">{product.category}</p>
        <h3 className="text-sm font-medium leading-snug line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm font-semibold text-gray-900">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
