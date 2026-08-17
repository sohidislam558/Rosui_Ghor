import type { Paginated, Recipe, RecipeInput } from "@/types";
import { delay } from "./apiClient";
import { mockRecipes, withCategory } from "./mockDb";

export interface RecipeQuery {
  search?: string;
  categoryId?: number | null;
  page?: number;
  perPage?: number;
}

let store = [...mockRecipes];
let nextId = store.length + 1;

/** Replace the mock bodies with `apiClient.get("/recipes", { params })` etc. */
export const recipeService = {
  async list(query: RecipeQuery = {}): Promise<Paginated<Recipe>> {
    await delay();
    const { search = "", categoryId = null, page = 1, perPage = 8 } = query;
    const term = search.trim().toLowerCase();
    const filtered = store
      .filter((r) => (term ? r.title.toLowerCase().includes(term) : true))
      .filter((r) => (categoryId ? r.category_id === categoryId : true))
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
    const start = (page - 1) * perPage;
    return {
      data: filtered.slice(start, start + perPage).map(withCategory),
      meta: {
        current_page: page,
        last_page: Math.max(1, Math.ceil(filtered.length / perPage)),
        per_page: perPage,
        total: filtered.length,
      },
    };
  },

  async featured(limit = 3): Promise<Recipe[]> {
    await delay(250);
    return store.slice(0, limit).map(withCategory);
  },

  async latest(limit = 4): Promise<Recipe[]> {
    await delay(250);
    return [...store]
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, limit)
      .map(withCategory);
  },

  async all(): Promise<Recipe[]> {
    await delay(250);
    return store.map(withCategory);
  },

  async get(id: number): Promise<Recipe> {
    await delay();
    const found = store.find((r) => r.id === id);
    if (!found) throw { message: "Recipe not found", status: 404 };
    return withCategory(found);
  },

  async create(input: RecipeInput): Promise<Recipe> {
    await delay(600);
    const now = new Date().toISOString();
    const created: Recipe = { id: nextId++, ...input, created_at: now, updated_at: now };
    store = [created, ...store];
    return withCategory(created);
  },

  async update(id: number, input: RecipeInput): Promise<Recipe> {
    await delay(600);
    const index = store.findIndex((r) => r.id === id);
    if (index === -1) throw { message: "Recipe not found", status: 404 };
    const updated: Recipe = { ...store[index]!, ...input, updated_at: new Date().toISOString() };
    store = store.map((r) => (r.id === id ? updated : r));
    return withCategory(updated);
  },

  async remove(id: number): Promise<void> {
    await delay(400);
    store = store.filter((r) => r.id !== id);
  },

  async countByCategory(categoryId: number): Promise<number> {
    return store.filter((r) => r.category_id === categoryId).length;
  },
};
