"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category, Gender, PriceRange, Product } from "@/types/product";
import { applyFilters } from "@/lib/filters";
import { useDebouncedValue } from "@/lib/debounce";
import CategoryFilter from "./CategoryFilter";
import GenderFilter from "./GenderFilter";
import PriceFilter from "./PriceFilter";
import SearchBox from "./SearchBox";
import ProductGrid from "@/components/products/ProductGrid";

type Props = {
  products: Product[];
  categories: Category[];
};

function isValidCategory(val: string | null, categories: Category[]) {
  if (!val) return false;
  return categories.includes(val as Category);
}

function isValidPrice(val: string | null): val is PriceRange {
  return val === "all" || val === "lt-50" || val === "50-100" || val === "gt-100";
}

function isValidGender(val: string | null): val is Gender {
  return val === "Men" || val === "Women" || val === "Kids" || val === "Teen" || val === "Unisex";
}

export default function FiltersBar({ products, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<"all" | Category>("all");
  const [gender, setGender] = useState<"all" | Gender>("all");
  const [price, setPrice] = useState<PriceRange>("all");
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 300);
  const lastSyncedUrl = useRef<string>("");

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlGender = searchParams.get("gender");
    const urlPrice = searchParams.get("price");
    const urlQuery = searchParams.get("q") ?? "";

    const nextCategory: "all" | Category =
      urlCategory && isValidCategory(urlCategory, categories)
        ? (urlCategory as Category)
        : "all";

    const nextGender: "all" | Gender =
      urlGender && isValidGender(urlGender) ? (urlGender as Gender) : "all";

    const nextPrice: PriceRange =
      urlPrice && isValidPrice(urlPrice) ? urlPrice : "all";

    const nextQuery = urlQuery;

    const nextUrl = `${pathname}?${searchParams.toString()}`;

    const same =
      category === nextCategory &&
      gender === nextGender &&
      price === nextPrice &&
      query === nextQuery &&
      lastSyncedUrl.current === nextUrl;

    if (!same) {
      setCategory(nextCategory);
      setGender(nextGender);
      setPrice(nextPrice);
      setQuery(nextQuery);
      lastSyncedUrl.current = nextUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname, categories]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") params.delete("category");
    else params.set("category", category);

    if (gender === "all") params.delete("gender");
    else params.set("gender", gender);

    if (price === "all") params.delete("price");
    else params.set("price", price);

    const q = debouncedQuery.trim();
    if (!q) params.delete("q");
    else params.set("q", q);

    const next = params.toString();
    const nextUrl = next ? `${pathname}?${next}` : pathname;

    if (nextUrl !== lastSyncedUrl.current) {
      router.replace(nextUrl, { scroll: false });
      lastSyncedUrl.current = nextUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, gender, price, debouncedQuery, pathname]);

  const filtered = useMemo(() => {
    return applyFilters(products, { category, gender, price, query: debouncedQuery });
  }, [products, category, gender, price, debouncedQuery]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
          <PriceFilter value={price} onChange={setPrice} />
          <SearchBox value={query} onChange={setQuery} />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
            results
          </p>

          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setGender("all");
              setPrice("all");
              setQuery("");
              router.replace(pathname, { scroll: false });
              lastSyncedUrl.current = pathname;
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
