import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: Product["category"];
  quantity: number;
};

type CartState = {
  items: Record<string, CartItem>;

  isOpen: boolean;
  toast: { visible: boolean; message: string };

  open: () => void;
  close: () => void;
  toggle: () => void;

  showToast: (message: string) => void;
  hideToast: () => void;

  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;

  totalItems: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},

      isOpen: false,
      toast: { visible: false, message: "" },

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      showToast: (message) => set({ toast: { visible: true, message } }),
      hideToast: () => set({ toast: { visible: false, message: "" } }),

      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items[product.id];
          const nextQty = (existing?.quantity ?? 0) + qty;

          return {
            items: {
              ...state.items,
              [product.id]: {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: nextQty,
              },
            },
          };
        }),

      remove: (id) =>
        set((state) => {
          const next = { ...state.items };
          delete next[id];
          return { items: next };
        }),

      increase: (id) =>
        set((state) => {
          const item = state.items[id];
          if (!item) return state;
          return { items: { ...state.items, [id]: { ...item, quantity: item.quantity + 1 } } };
        }),

      decrease: (id) =>
        set((state) => {
          const item = state.items[id];
          if (!item) return state;

          const nextQty = item.quantity - 1;
          if (nextQty <= 0) {
            const next = { ...state.items };
            delete next[id];
            return { items: next };
          }

          return { items: { ...state.items, [id]: { ...item, quantity: nextQty } } };
        }),

      clear: () => set({ items: {} }),

      totalItems: () => Object.values(get().items).reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => Object.values(get().items).reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }), 
    }
  )
);
