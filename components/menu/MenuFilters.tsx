"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

type Category = { id: string; name: string };

export function MenuFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/menu?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParam("search", value);
  }, 300);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
        <input
          type="text"
          placeholder="Rechercher un plat..."
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="input-field pl-9 text-sm"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => updateParam("category", "")}
          className={`px-4 py-2 rounded-sm text-sm transition-all ${
            !currentCategory
              ? "bg-amber-600 text-white"
              : "bg-stone-900 border border-stone-700 text-stone-400 hover:border-amber-600 hover:text-amber-400"
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateParam("category", cat.id)}
            className={`px-4 py-2 rounded-sm text-sm transition-all ${
              currentCategory === cat.id
                ? "bg-amber-600 text-white"
                : "bg-stone-900 border border-stone-700 text-stone-400 hover:border-amber-600 hover:text-amber-400"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}