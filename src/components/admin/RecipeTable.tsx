import { Link } from "@tanstack/react-router";
import { Edit2, Trash2, Clock, ChefHat } from "lucide-react";
import type { Recipe } from "@/types";
import { recipeImage } from "@/services/mockDb";

interface RecipeTableProps {
  recipes: Recipe[];
  onDelete: (recipe: Recipe) => void;
}

export function RecipeTable({ recipes, onDelete }: RecipeTableProps) {
  if (recipes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">Recipe</th>
              <th scope="col" className="px-3 py-3.5">Category</th>
              <th scope="col" className="px-3 py-3.5">Cooking Time</th>
              <th scope="col" className="px-3 py-3.5">Difficulty</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {recipes.map((recipe) => {
              const imgUrl = recipeImage(recipe);
              return (
                <tr key={recipe.id} className="transition-colors hover:bg-muted/30">
                  <td className="py-4 pl-4 pr-3 sm:pl-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={imgUrl}
                        alt={recipe.title}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover bg-muted"
                      />
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <Link
                          to="/recipes/$id"
                          params={{ id: String(recipe.id) }}
                          className="font-medium text-foreground hover:text-primary transition-colors block truncate"
                        >
                          {recipe.title}
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">{recipe.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      {recipe.category?.name ?? "Uncategorized"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {recipe.cooking_time} mins
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <ChefHat className="h-3.5 w-3.5 text-secondary" />
                      {recipe.difficulty}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/admin/recipes/$id/edit"
                        params={{ id: String(recipe.id) }}
                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={`Edit ${recipe.title}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(recipe)}
                        className="rounded-lg border border-border p-2 text-destructive transition-colors hover:bg-destructive-soft"
                        aria-label={`Delete ${recipe.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
