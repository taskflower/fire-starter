// src/components/ui/CategorySelector.tsx
import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  children?: Category[];
}

interface CategorySelectorProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

const renderTree = (
  categories: Category[],
  onSelect: (id: string) => void,
  prefix = ""
): JSX.Element[] => {
  return categories.flatMap((category) => [
    <div
      key={category.id}
      onClick={() => onSelect(category.id)}
      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
    >
      {prefix}
      {category.name}
    </div>,
    ...(category.children
      ? renderTree(category.children, onSelect, `${prefix}— `)
      : []),
  ]);
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={categories.find((cat) => cat.id === value)?.name || ""}
        onClick={() => setOpen((prev) => !prev)}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Select category"
        className="w-full border rounded px-3 py-2"
      />
      {open && (
        <div className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
          {renderTree(filteredCategories, (id) => {
            onChange(id);
            setOpen(false);
          })}
        </div>
      )}
    </div>
  );
};
