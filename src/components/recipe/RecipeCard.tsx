import { Link } from "@tanstack/react-router";
import { Clock, ChefHat, ArrowRight } from "lucide-react";
import type { Recipe } from "@/types";
import { recipeImage } from "@/services/mockDb";

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyColors = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  Medium: "bg-amber-50 text-amber-700 border-amber-200/60",
  Hard: "bg-rose-50 text-rose-700 border-rose-200/60",
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const imageUrl = recipeImage(recipe);
  const diffClass = difficultyColors[recipe.difficulty] || difficultyColors.Easy;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      {/* 4:3 Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {recipe.category?.name && (
          <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
            {recipe.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link to="/recipes/$id" params={{ id: String(recipe.id) }}>
            {recipe.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed flex-1">
          {recipe.description}
        </p>

        {/* Metadata Chips */}
        <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>{recipe.cooking_time} mins</span>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${diffClass}`}
          >
            <ChefHat className="h-3 w-3" aria-hidden="true" />
            <span>{recipe.difficulty}</span>
          </span>
        </div>

        {/* View Details Link */}
        <div className="mt-4 pt-1">
          <Link
            to="/recipes/$id"
            params={{ id: String(recipe.id) }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted py-2 px-3 text-xs font-semibold text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <span>View Recipe</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
