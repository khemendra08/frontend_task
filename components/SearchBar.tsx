'use client'

export function SearchBar({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full max-w-sm"
    />
  )
}