import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Category, RecipeInput } from "@/types";
import { categoryService } from "@/services/categoryService";
import { recipeService } from "@/services/recipeService";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RecipeForm } from "@/components/admin/RecipeForm";
import { LoadingIndicator } from "@/components/common/States";

export const Route = createFileRoute("/admin/recipes/create")({
  component: AdminCreateRecipePage,
});

function AdminCreateRecipePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .list()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (data: RecipeInput) => {
    await recipeService.create(data);
    navigate({ to: "/admin/recipes", replace: true });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Add New Recipe"
        description="Enter recipe details, ingredients, cooking instructions, and image."
      >
        {loading ? (
          <LoadingIndicator label="Loading categories…" />
        ) : (
          <div className="max-w-4xl">
            <RecipeForm
              categories={categories}
              onSubmit={handleSubmit}
              submitLabel="Publish Recipe"
            />
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
