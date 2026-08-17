import type { InteractionType, RecipeInteraction } from "@/types";
import { delay } from "./apiClient";
import { mockInteractions } from "./mockDb";

let store: RecipeInteraction[] = [...mockInteractions];
const TYPE: InteractionType = "favorite";

export const interactionService = {
  async get(userId: number, recipeId: number): Promise<boolean> {
    await delay(200);
    return store.some((i) => i.user_id === userId && i.recipe_id === recipeId);
  },

  async toggle(userId: number, recipeId: number): Promise<boolean> {
    await delay(500);
    const exists = store.some((i) => i.user_id === userId && i.recipe_id === recipeId);
    store = exists
      ? store.filter((i) => !(i.user_id === userId && i.recipe_id === recipeId))
      : [...store, { user_id: userId, recipe_id: recipeId, interaction_type: TYPE }];
    return !exists;
  },
};
