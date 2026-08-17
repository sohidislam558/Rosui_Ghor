import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Category, CategoryInput } from "@/types";
import { categoryService } from "@/services/categoryService";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CategoryTable } from "@/components/admin/CategoryTable";
import { CategoryModal } from "@/components/admin/CategoryModal";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import { LoadingIndicator } from "@/components/common/States";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.list();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreate = () => {
    setFeedback(null);
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setFeedback(null);
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleModalSubmit = async (data: CategoryInput) => {
    if (editingCategory) {
      await categoryService.update(editingCategory.id, data);
      setFeedback({
        type: "success",
        message: `Category "${data.name}" updated successfully.`,
      });
    } else {
      await categoryService.create(data);
      setFeedback({
        type: "success",
        message: `Category "${data.name}" created successfully.`,
      });
    }
    await loadCategories();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await categoryService.remove(deleteTarget.id);
      setFeedback({
        type: "success",
        message: `Category "${deleteTarget.name}" was deleted.`,
      });
      setDeleteTarget(null);
      await loadCategories();
    } catch (err: any) {
      setFeedback({
        type: "error",
        message:
          err?.message ||
          "This category contains recipes and cannot be deleted until related recipes are reassigned.",
      });
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Category Management"
        description="Organize your recipe collection into meal courses and cuisine groups."
        actions={
          <Button variant="primary" onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add Category
          </Button>
        }
      >
        <div className="space-y-6">
          {feedback && (
            <Alert
              variant={feedback.type}
              title={feedback.type === "success" ? "Success" : "Notice"}
            >
              {feedback.message}
            </Alert>
          )}

          {loading ? (
            <LoadingIndicator label="Loading categories…" />
          ) : (
            <CategoryTable
              categories={categories}
              onEdit={handleOpenEdit}
              onDelete={(category) => {
                setFeedback(null);
                setDeleteTarget(category);
              }}
            />
          )}

          {/* Add / Edit Category Modal */}
          <CategoryModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingCategory(null);
            }}
            onSubmit={handleModalSubmit}
            category={editingCategory}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            open={Boolean(deleteTarget)}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDeleteConfirm}
            title="Delete Category"
            message={`Are you sure you want to delete the category "${deleteTarget?.name}"? If it contains recipes, deletion will be rejected.`}
            loading={deleting}
          />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
