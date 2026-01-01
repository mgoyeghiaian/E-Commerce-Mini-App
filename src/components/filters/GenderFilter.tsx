"use client";

import type { Gender } from "@/types/product";

type Props = {
  value: "all" | Gender;
  onChange: (val: "all" | Gender) => void;
};

const OPTIONS: Array<{ label: string; value: "all" | Gender }> = [
  { label: "All", value: "all" },
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
  { label: "Kids", value: "Kids" },
  { label: "Teen", value: "Teen" },
  { label: "Unisex", value: "Unisex" },
];

export default function GenderFilter({ value, onChange }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">Gender</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "all" | Gender)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-400"
        aria-label="Filter by gender"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
