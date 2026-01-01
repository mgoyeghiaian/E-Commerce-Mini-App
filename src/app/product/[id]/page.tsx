import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import type { Gender } from "@/types/product";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ gender?: string }>;
};

function isGender(val?: string): val is Gender {
  return val === "Men" || val === "Women" || val === "Kids" || val === "Teen" || val === "Unisex";
}

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export default async function ProductDetailsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};

  const genderParam = sp.gender;
  const activeGender: "all" | Gender = isGender(genderParam) ? genderParam : "all";

  const allProducts = getProducts();
  const product = getProductById(id);

  if (!product) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={activeGender === "all" ? "/" : `/?gender=${encodeURIComponent(activeGender)}`}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-80 md:h-105 border border-gray-200 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">{product.category}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-500">{product.gender}</span>
          </div>

          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-xl text-gray-900 font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts
        current={product}
        all={allProducts}
        limit={4}
        gender={activeGender}
      />
    </main>
  );
}
