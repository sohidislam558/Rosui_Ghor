import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Recipe } from "@/types";
import { recipeService } from "@/services/recipeService";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RecipeTable } from "@/components/admin/RecipeTable";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { SearchBar } from "@/components/recipe/SearchBar";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import { LoadingIndicator } from "@/components/common/States";

export const Route = createFileRoute("/admin/recipes/")({
  component: AdminRecipesPage,
});

function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Recipe | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadRecipes = async (query = "") => {
    try {
      setLoading(true);
      const res = await recipeService.list({ search: query, perPage: 100 });
      setRecipes(res.data);
    } catch (err) {
      console.error("Failed to load admin recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes(search);
  }, [search]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await recipeService.remove(deleteTarget.id);
      setFeedback({
        type: "success",
        message: `Recipe "${deleteTarget.title}" was permanently deleted.`,
      });
      setDeleteTarget(null);
      await loadRecipes(search);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Failed to delete recipe.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Recipe Management"
        description="Create, view, update, and manage all recipes in the Rosui Ghor catalogue."
        actions={
          <Link to="/admin/recipes/create">
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Recipe
            </Button>
          </Link>
        }
      >
        <div className="space-y-6">
          {feedback && (
            <Alert
              variant={feedback.type}
              title={feedback.type === "success" ? "Success" : "Error"}
            >
              {feedback.message}
            </Alert>
          )}

          {/* Search bar */}
          <div className="max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Filter recipes by title…"
            />
          </div>

          {/* Table or Loading */}
          {loading ? (
            <LoadingIndicator label="Loading recipe records…" />
          ) : (
            <RecipeTable
              recipes={recipes}
              onDelete={(recipe) => {
                setFeedback(null);
                setDeleteTarget(recipe);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            open={Boolean(deleteTarget)}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDeleteConfirm}
            title="Delete Recipe"
            message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
            loading={deleting}
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
