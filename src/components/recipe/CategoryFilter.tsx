import type { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  totalCount?: number;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-2" role="group" aria-label="Category filters">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-xs",
          selectedCategoryId === null
            ? "bg-primary text-primary-foreground font-semibold shadow-sm"
            : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span>All Recipes</span>
      </button>

      {categories.map((cat) => {
        const active = selectedCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-xs",
              active
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{cat.name}</span>
            {cat.recipes_count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-xs",
                  active ? "bg-primary-hover text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {cat.recipes_count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
