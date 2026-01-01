export type Category = string;

export type Gender = "Men" | "Women" | "Kids" | "Teen" | "Unisex";

export type PriceRange = "all" | "lt-50" | "50-100" | "gt-100";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: Category;
  gender: Gender;
  image: string;
  description: string;
};
