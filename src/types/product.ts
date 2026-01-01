export type Category =
  | "Shoes"
  | "Shirts"
  | "Electronics"
  | "Accessories"
  | "Home";

export type PriceRange = "all" | "lt-50" | "50-100" | "gt-100";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: Category;
  image: string;
  description: string;
};
