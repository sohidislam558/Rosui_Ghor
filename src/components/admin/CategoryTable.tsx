import { Edit2, Trash2, FolderTree, AlertCircle } from "lucide-react";
import type { Category } from "@/types";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <FolderTree className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No categories defined yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">Category Name</th>
              <th scope="col" className="px-3 py-3.5">Description</th>
              <th scope="col" className="px-3 py-3.5">Recipes</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {categories.map((cat) => (
              <tr key={cat.id} className="transition-colors hover:bg-muted/30">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 font-semibold text-foreground sm:pl-6">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                      <FolderTree className="h-4 w-4" />
                    </span>
                    <span>{cat.name}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-muted-foreground max-w-sm truncate">
                  {cat.description || "No description"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    {cat.recipes_count ?? 0} {cat.recipes_count === 1 ? "recipe" : "recipes"}
                  </span>
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(cat)}
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`Edit ${cat.name}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(cat)}
                      className="rounded-lg border border-border p-2 text-destructive transition-colors hover:bg-destructive-soft"
                      aria-label={`Delete ${cat.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
