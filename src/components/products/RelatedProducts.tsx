import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

type Props = {
  current: Product;
  all: Product[];
  limit?: number;
};

export default function RelatedProducts({ current, all, limit = 4 }: Props) {
  const related = all
    .filter((p) => p.id !== current.id)
    .filter((p) => p.category === current.category)
    .filter((p) => p.gender === current.gender)
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Related products</h2>
      <ProductGrid products={related} />
    </section>
  );
}
