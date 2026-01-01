"use client";

import { useMemo, useState } from "react";
import { Category, PriceRange, Product } from "@/types/product";
import { applyFilters } from "@/lib/filters";
import { useDebouncedValue } from "@/lib/debounce";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SearchBox from "./SearchBox";
import ProductGrid from "@/components/products/ProductGrid";

type Props = {
  products: Product[];
  categories: Category[];
};

export default function FiltersBar({ products, categories }: Props) {
  const [category, setCategory] = useState<"all" | Category>("all");
  const [price, setPrice] = useState<PriceRange>("all");
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 300);

  const filtered = useMemo(() => {
    return applyFilters(products, { category, price, query: debouncedQuery });
  }, [products, category, price, debouncedQuery]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
          <PriceFilter value={price} onChange={setPrice} />
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium text-gray-900">{filtered.length}</span> results
          </p>

          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setPrice("all");
              setQuery("");
            }}
            className="text-sm rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
