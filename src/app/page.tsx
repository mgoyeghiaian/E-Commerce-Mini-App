import { getProducts, getCategories } from "@/lib/products";
import FiltersBar from "@/components/filters/FiltersBar";


export default function HomePage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <main className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold">Browse Products</h1>
        <p className="text-sm text-gray-500">Filter by category, price, or search.</p>
      </div>

      <FiltersBar products={products} categories={categories} />
    </main>
  );
}
