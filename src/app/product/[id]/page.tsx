import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}


export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-sm underline">
          Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-80 md:h-[420px] border rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="pt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:shadow focus-visible:outline focus-visible:outline-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
