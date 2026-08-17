import type { Recipe } from "@/types";
import { RecipeCard } from "./RecipeCard";
import { RecipeCardSkeleton, EmptyState } from "@/components/common/States";

interface RecipeGridProps {
  recipes: Recipe[];
  loading?: boolean | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
  onClearFilters?: (() => void) | undefined;
}

export function RecipeGrid({
  recipes,
  loading = false,
  emptyTitle = "No recipes found",
  emptyDescription = "Try adjusting your search query or selecting a different category.",
  onClearFilters,
}: RecipeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onClearFilters ? "Reset Filters" : undefined}
        onAction={onClearFilters}
        className="my-8"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
