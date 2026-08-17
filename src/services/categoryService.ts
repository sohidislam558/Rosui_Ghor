import type { Category, CategoryInput } from "@/types";
import { apiClient } from "./apiClient";

export const categoryService = {
  async list(): Promise<Category[]> {
    const res = await apiClient.get<Category[]>("/categories");
    return Array.isArray(res.data) ? res.data : (res.data as any).data || [];
  },

  async create(input: CategoryInput): Promise<Category> {
    const res = await apiClient.post<Category>("/categories", {
      name: input.name.trim(),
      description: input.description.trim(),
    });
    return res.data;
  },

  async update(id: number, input: CategoryInput): Promise<Category> {
    const res = await apiClient.put<Category>(`/categories/${id}`, {
      name: input.name.trim(),
      description: input.description.trim(),
    });
    return res.data;
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
