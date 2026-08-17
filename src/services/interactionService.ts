import { apiClient } from "./apiClient";

export const interactionService = {
  async get(_userId: number, recipeId: number): Promise<boolean> {
    try {
      const res = await apiClient.get<{ favorited: boolean }>(`/recipes/${recipeId}/interactions`);
      return Boolean(res.data?.favorited);
    } catch {
      return false;
    }
  },

  async toggle(_userId: number, recipeId: number): Promise<boolean> {
    const res = await apiClient.post<{ favorited: boolean; message: string }>(
      `/recipes/${recipeId}/interactions`
    );
    return Boolean(res.data?.favorited);
  },
};
