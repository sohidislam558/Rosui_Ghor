import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Category, Recipe, RecipeInput } from "@/types";
import { categoryService } from "@/services/categoryService";
import { recipeService } from "@/services/recipeService";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RecipeForm } from "@/components/admin/RecipeForm";
import { LoadingIndicator, ErrorState } from "@/components/common/States";

export const Route = createFileRoute("/admin/recipes/$id/edit")({
  component: AdminEditRecipePage,
});

function AdminEditRecipePage() {
  const { id } = useParams({ from: "/admin/recipes/$id/edit" });
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [recipeData, catData] = await Promise.all([
          recipeService.get(Number(id)),
          categoryService.list(),
        ]);
        setRecipe(recipeData);
        setCategories(catData);
      } catch (err: any) {
        setError(err?.message || "Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadData();
    }
  }, [id]);

  const handleSubmit = async (data: RecipeInput) => {
    if (!recipe) return;
    await recipeService.update(recipe.id, data);
    navigate({ to: "/admin/recipes", replace: true });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Edit Recipe"
        description={`Updating details for "${recipe?.title ?? "Recipe"}"`}
      >
        {loading ? (
          <LoadingIndicator label="Loading recipe details…" />
        ) : error || !recipe ? (
          <ErrorState
            title="Recipe Not Found"
            description={error || "The recipe you are trying to edit does not exist."}
            actionLabel="Return to Recipe List"
            onAction={() => navigate({ to: "/admin/recipes" })}
          />
        ) : (
          <div className="max-w-4xl">
            <RecipeForm
              initialValues={recipe}
              categories={categories}
              onSubmit={handleSubmit}
              submitLabel="Save Changes"
              isEditing
            />
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
