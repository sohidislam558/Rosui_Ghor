import { useState, useEffect, type FormEvent } from "react";
import type { Category, CategoryInput } from "@/types";
import { Modal } from "@/components/common/Modal";
import { Input, Textarea } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryInput) => Promise<void>;
  category?: Category | null;
}

export function CategoryModal({
  open,
  onClose,
  onSubmit,
  category,
}: CategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(category?.name ?? "");
      setDescription(category?.description ?? "");
      setError(null);
    }
  }, [open, category]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={category ? "Edit Category" : "Add New Category"}
      description="Categories help organize recipes on the discovery page."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" form="category-modal-form" variant="primary" loading={loading}>
            {category ? "Update Category" : "Create Category"}
          </Button>
        </>
      }
    >
      <form id="category-modal-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}

        <Input
          label="Category Name"
          id="category-name"
          required
          placeholder="e.g. Desserts, Street Food, Beverages"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          label="Description"
          id="category-description"
          placeholder="Brief note about the type of recipes in this category…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </Modal>
  );
}
