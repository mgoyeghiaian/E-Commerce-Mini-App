import { Category } from "@/types/product";

type Props = {
  categories: Category[];
  value: "all" | Category;
  onChange: (value: "all" | Category) => void;
};

export default function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <label className="space-y-1">
      <span className="text-xs text-gray-600">Category</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "all" | Category)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
