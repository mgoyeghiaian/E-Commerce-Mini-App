import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
