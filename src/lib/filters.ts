import type { Category, Gender, PriceRange, Product } from "@/types/product";

export type FilterState = {
  category: "all" | Category;
  price: PriceRange;
  query: string;
  gender?: "all" | Gender;
};

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  const q = filters.query.trim().toLowerCase();
  const gender = filters.gender ?? "all";

  return products.filter((p) => {
    const matchCategory = filters.category === "all" || p.category === filters.category;
    const matchGender = gender === "all" || p.gender === gender;

    const matchPrice =
      filters.price === "all" ||
      (filters.price === "lt-50" && p.price < 50) ||
      (filters.price === "50-100" && p.price >= 50 && p.price <= 100) ||
      (filters.price === "gt-100" && p.price > 100);

    const matchQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q);

    return matchCategory && matchGender && matchPrice && matchQuery;
  });
}
