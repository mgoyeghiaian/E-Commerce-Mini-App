import { Category, PriceRange, Product } from "@/types/product";

export type FiltersState = {
  category: "all" | Category;
  price: PriceRange;
  query: string;
};

function parseQueryPrice(q: string): { min?: number; max?: number } | null {
  const s = q.trim().toLowerCase();

  const range = s.match(/(\d+)\s*-\s*(\d+)/);
  if (range) {
    const a = Number(range[1]);
    const b = Number(range[2]);
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return { min, max };
  }

  const under = s.match(/(?:under|less than|<)\s*(\d+)/);
  if (under) return { max: Number(under[1]) };

  const over = s.match(/(?:over|more than|>)\s*(\d+)/);
  if (over) return { min: Number(over[1]) };

  const single = s.match(/^\d+$/);
  if (single) {
    const v = Number(single[0]);
    return { min: v, max: v };
  }

  return null;
}

export function applyFilters(products: Product[], filters: FiltersState): Product[] {
  const qRaw = filters.query.trim();
  const q = qRaw.toLowerCase();
  const queryPrice = qRaw.length ? parseQueryPrice(qRaw) : null;

  return products.filter((p) => {
    const matchCategorySelect =
      filters.category === "all" ? true : p.category === filters.category;

    const matchPriceSelect =
      filters.price === "all"
        ? true
        : filters.price === "lt-50"
        ? p.price < 50
        : filters.price === "50-100"
        ? p.price >= 50 && p.price <= 100
        : p.price > 100;

    const matchText =
      q.length === 0
        ? true
        : p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);

    const matchQueryPrice =
      !queryPrice
        ? true
        : (queryPrice.min === undefined || p.price >= queryPrice.min) &&
          (queryPrice.max === undefined || p.price <= queryPrice.max);

    return matchCategorySelect && matchPriceSelect && matchText && matchQueryPrice;
  });
}
