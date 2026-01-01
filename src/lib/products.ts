import raw from "@/data/products.json";
import { Category, Product } from "@/types/product";

type ProductWithoutCategory = Omit<Product, "category">;
type ProductsByCategory = Record<Category, ProductWithoutCategory[]>;

const productsData = raw as ProductsByCategory;

export function getProducts(): Product[] {
  const out: Product[] = [];

  (Object.keys(productsData) as Category[]).forEach((category) => {
    const items = productsData[category] ?? [];
    items.forEach((item) => {
      out.push({
        ...item,
        category,
      });
    });
  });

  return out;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}
