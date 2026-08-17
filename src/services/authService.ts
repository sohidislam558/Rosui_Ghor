import type { AuthResponse, User } from "@/types";
import { apiClient } from "./apiClient";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const authService = {
  async login({ email, password }: LoginInput): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>("/login", {
      email: email.trim(),
      password,
    });
    return res.data;
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>("/register", {
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      password_confirmation: input.password_confirmation,
    });
    return res.data;
  },

  async me(_token?: string): Promise<User> {
    const res = await apiClient.get<User>("/user");
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/logout");
    } catch {
      // Ignore errors on logout
    }
  },

  async updateProfile(_id: number, data: { name: string; email: string }): Promise<User> {
    const res = await apiClient.put<{ message: string; user: User }>("/user", {
      name: data.name.trim(),
      email: data.email.trim(),
    });
    return res.data.user;
  },

  async count(): Promise<number> {
    const res = await apiClient.get<{ total_users: number }>("/admin/statistics");
    return res.data.total_users;
  },
};
