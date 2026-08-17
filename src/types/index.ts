export type Role = "user" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  recipes_count?: number;
  created_at: string;
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Recipe {
  id: number;
  category_id: number;
  category?: Category;
  title: string;
  description: string;
  image_url: string | null;
  image_path: string | null;
  ingredients: string;
  cooking_time: number;
  difficulty: Difficulty;
  instructions: string;
  created_at: string;
  updated_at: string;
}

export type InteractionType = "favorite";

export interface RecipeInteraction {
  user_id: number;
  recipe_id: number;
  interaction_type: InteractionType;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  meta: Pagination;
}

export interface RecipeInput {
  title: string;
  description: string;
  category_id: number;
  ingredients: string;
  cooking_time: number;
  difficulty: Difficulty;
  instructions: string;
  image_url: string | null;
  image_path: string | null;
}

export interface CategoryInput {
  name: string;
  description: string;
}
