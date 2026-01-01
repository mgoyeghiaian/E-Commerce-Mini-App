import raw from "@/data/products.json";
import type { Product, Gender } from "@/types/product";

type RawProduct = Omit<Product, "category" | "gender"> & {
  gender?: string;
};

function isGender(val: unknown): val is Gender {
  return (
    val === "Men" ||
    val === "Women" ||
    val === "Kids" ||
    val === "Teen" ||
    val === "Unisex"
  );
}

export function getProducts(): Product[] {
  const data = raw as Record<string, RawProduct[]>;
  const out: Product[] = [];

  Object.entries(data).forEach(([category, items]) => {
    items.forEach((item) => {
      out.push({
        ...item,
        category, 
        gender: isGender(item.gender) ? item.gender : "Unisex",
      });
    });
  });

  return out;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getCategories(): string[] {
  return Object.keys(raw);
}
