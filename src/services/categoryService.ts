import type { Category, CategoryInput } from "@/types";
import { delay } from "./apiClient";
import { mockCategories } from "./mockDb";
import { recipeService } from "./recipeService";

let store = [...mockCategories];
let nextId = store.length + 1;

export const categoryService = {
  async list(): Promise<Category[]> {
    await delay(250);
    return Promise.all(
      store.map(async (c) => ({ ...c, recipes_count: await recipeService.countByCategory(c.id) })),
    );
  },

  async create(input: CategoryInput): Promise<Category> {
    await delay(500);
    const created: Category = { id: nextId++, ...input, created_at: new Date().toISOString() };
    store = [...store, created];
    return created;
  },

  async update(id: number, input: CategoryInput): Promise<Category> {
    await delay(500);
    const index = store.findIndex((c) => c.id === id);
    if (index === -1) throw { message: "Category not found", status: 404 };
    const updated = { ...store[index]!, ...input };
    store = store.map((c) => (c.id === id ? updated : c));
    return updated;
  },

  async remove(id: number): Promise<void> {
    await delay(400);
    const count = await recipeService.countByCategory(id);
    if (count > 0) {
      throw {
        message: "This category contains recipes and cannot be deleted until the related recipes are handled.",
        status: 409,
      };
    }
    store = store.filter((c) => c.id !== id);
  },
};
