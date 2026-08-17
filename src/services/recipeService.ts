import type { Paginated, Recipe, RecipeInput } from "@/types";
import { apiClient } from "./apiClient";

export interface RecipeQuery {
  search?: string | undefined;
  categoryId?: number | null | undefined;
  page?: number | undefined;
  perPage?: number | undefined;
}

export const recipeService = {
  async list(query: RecipeQuery = {}): Promise<Paginated<Recipe>> {
    const params: Record<string, unknown> = {};
    if (query.search) params["search"] = query.search;
    if (query.categoryId !== null && query.categoryId !== undefined) {
      params["category_id"] = query.categoryId;
    }
    if (query.page) params["page"] = query.page;
    if (query.perPage) params["per_page"] = query.perPage;

    const res = await apiClient.get<Paginated<Recipe>>("/recipes", { params });
    return res.data;
  },

  async featured(limit = 3): Promise<Recipe[]> {
    const res = await apiClient.get<Recipe[]>("/recipes", { params: { limit } });
    return Array.isArray(res.data) ? res.data : (res.data as any).data || [];
  },

  async latest(limit = 4): Promise<Recipe[]> {
    const res = await apiClient.get<Recipe[]>("/recipes", { params: { limit } });
    return Array.isArray(res.data) ? res.data : (res.data as any).data || [];
  },

  async all(): Promise<Recipe[]> {
    const res = await apiClient.get<Recipe[]>("/recipes", { params: { limit: 100 } });
    return Array.isArray(res.data) ? res.data : (res.data as any).data || [];
  },

  async get(id: number): Promise<Recipe> {
    const res = await apiClient.get<Recipe>(`/recipes/${id}`);
    return res.data;
  },

  async create(input: RecipeInput): Promise<Recipe> {
    if (input.image instanceof File) {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("category_id", String(input.category_id));
      formData.append("cooking_time", String(input.cooking_time));
      formData.append("difficulty", input.difficulty);
      formData.append("ingredients", input.ingredients);
      formData.append("instructions", input.instructions);
      formData.append("image", input.image);

      const res = await apiClient.post<Recipe>("/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }

    const res = await apiClient.post<Recipe>("/recipes", {
      title: input.title,
      description: input.description,
      category_id: input.category_id,
      cooking_time: input.cooking_time,
      difficulty: input.difficulty,
      ingredients: input.ingredients,
      instructions: input.instructions,
      image_url: input.image_url ?? null,
    });
    return res.data;
  },

  async update(id: number, input: RecipeInput): Promise<Recipe> {
    if (input.image instanceof File) {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("category_id", String(input.category_id));
      formData.append("cooking_time", String(input.cooking_time));
      formData.append("difficulty", input.difficulty);
      formData.append("ingredients", input.ingredients);
      formData.append("instructions", input.instructions);
      formData.append("image", input.image);

      const res = await apiClient.post<Recipe>(`/recipes/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }

    const res = await apiClient.put<Recipe>(`/recipes/${id}`, {
      title: input.title,
      description: input.description,
      category_id: input.category_id,
      cooking_time: input.cooking_time,
      difficulty: input.difficulty,
      ingredients: input.ingredients,
      instructions: input.instructions,
      image_url: input.image_url ?? null,
    });
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/recipes/${id}`);
  },

  async countByCategory(categoryId: number): Promise<number> {
    try {
      const res = await apiClient.get<{ recipes_count?: number }>(`/categories/${categoryId}`);
      return res.data.recipes_count ?? 0;
    } catch {
      return 0;
    }
  },
};
