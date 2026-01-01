import { PriceRange } from "@/types/product";

type Props = {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
};

export default function PriceFilter({ value, onChange }: Props) {
  return (
    <label className="space-y-1">
      <span className="text-xs text-gray-600">Price</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PriceRange)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      >
        <option value="all">All</option>
        <option value="lt-50">{"< 50"}</option>
        <option value="50-100">50–100</option>
        <option value="gt-100">{"> 100"}</option>
      </select>
    </label>
  );
}
