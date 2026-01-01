"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

export default function CartToast() {
  const toast = useCart((s) => s.toast);
  const hideToast = useCart((s) => s.hideToast);

  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(() => hideToast(), 1800);
    return () => clearTimeout(t);
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  return (
    <div className="fixed z-60 right-4 top-4">
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}
