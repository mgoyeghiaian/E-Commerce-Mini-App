type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({ value, onChange }: Props) {
  return (
    <label className="space-y-1">
      <span className="text-xs text-gray-600">Search</span>
      <input
        value={value}
        onChange={(e) => {
          const textOnly = e.target.value.replace(/[0-9]/g, "");
          onChange(textOnly);
        }}
        placeholder="Search by name or category..."
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      />
    </label>
  );
}
