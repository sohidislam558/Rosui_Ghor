import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, ChefHat, Sparkles, Check, BookmarkCheck } from "lucide-react";
import type { Recipe } from "@/types";
import { recipeService } from "@/services/recipeService";
import { recipeImage } from "@/services/mockDb";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RecipeInteractionButton } from "@/components/recipe/RecipeInteractionButton";
import { LoadingIndicator, ErrorState } from "@/components/common/States";

export const Route = createFileRoute("/recipes/$id")({
  component: RecipeDetailsPage,
});

function RecipeDetailsPage() {
  const { id } = useParams({ from: "/recipes/$id" });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        setLoading(true);
        setError(null);
        const data = await recipeService.get(Number(id));
        setRecipe(data);
      } catch (err: any) {
        setError(err?.message || "Unable to find the requested recipe.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadRecipe();
    }
  }, [id]);

  return (
    <SiteLayout>
      <ProtectedRoute>
        <div className="container-page py-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all recipes</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <LoadingIndicator label="Loading recipe details…" />
            </div>
          ) : error || !recipe ? (
            <ErrorState
              title="Recipe Not Found"
              description={error || "The recipe you are trying to view does not exist."}
              actionLabel="Return to Recipe Collection"
              onAction={() => (window.location.href = "/recipes")}
            />
          ) : (
            <div className="space-y-12">
              {/* Recipe Top Header & Image Grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                {/* Recipe Hero Image */}
                <div className="lg:col-span-6">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <img
                      src={recipeImage(recipe)}
                      alt={recipe.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>

                {/* Recipe Overview Header & Metadata */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    {recipe.category?.name && (
                      <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary shadow-xs">
                        {recipe.category.name}
                      </span>
                    )}

                    <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {recipe.title}
                    </h1>

                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {recipe.description}
                    </p>

                    {/* Metadata Chips */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border/80 py-4">
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
                          <Clock className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase text-muted-foreground">Cook Time</p>
                          <p className="text-sm font-bold text-foreground">{recipe.cooking_time} mins</p>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-border hidden sm:block" />

                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary-soft text-secondary">
                          <ChefHat className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase text-muted-foreground">Difficulty</p>
                          <p className="text-sm font-bold text-foreground">{recipe.difficulty}</p>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-border hidden sm:block" />

                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase text-muted-foreground">Status</p>
                          <p className="text-sm font-bold text-foreground">Complete Recipe</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Interaction Button */}
                  <div className="pt-2">
                    <RecipeInteractionButton recipeId={recipe.id} />
                  </div>
                </div>
              </div>

              {/* Ingredients and Instructions Grid */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Ingredients Card */}
                <div className="lg:col-span-5">
                  <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
                    <div className="flex items-center gap-2 border-b border-border/80 pb-4">
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-xl font-bold text-foreground">Ingredients</h2>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {recipe.ingredients
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean)
                        .map((ingredient, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                            <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                            <span className="leading-relaxed">{ingredient}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions Section */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
                    <h2 className="font-display text-xl font-bold text-foreground border-b border-border/80 pb-4">
                      Step-by-Step Instructions
                    </h2>

                    <div className="mt-6 space-y-6">
                      {recipe.instructions
                        .split("\n")
                        .map((step) => step.trim())
                        .filter(Boolean)
                        .map((instruction, idx) => {
                          // Clean potential leading number "1. " if already in text
                          const cleanText = instruction.replace(/^\d+[\.\)]\s*/, "");
                          return (
                            <div key={idx} className="flex items-start gap-4">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-secondary-foreground shadow-xs">
                                {idx + 1}
                              </span>
                              <div className="min-w-0 pt-0.5">
                                <p className="text-sm sm:text-base leading-relaxed text-foreground">
                                  {cleanText}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </SiteLayout>
  );
}
