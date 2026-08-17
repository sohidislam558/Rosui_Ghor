import type { AuthResponse, User } from "@/types";
import { delay } from "./apiClient";
import { mockUsers } from "./mockDb";

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

let users = [...mockUsers];
let nextId = users.length + 1;

export const authService = {
  async login({ email, password }: LoginInput): Promise<AuthResponse> {
    await delay(600);
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found || found.password !== password) {
      throw { message: "These credentials do not match our records.", status: 401 };
    }
    const { password: _pw, ...user } = found;
    return { token: `mock-token-${user.id}`, user };
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    await delay(700);
    if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
      throw { message: "Registration failed.", status: 422, errors: { email: ["This email is already registered."] } };
    }
    const created = {
      id: nextId++,
      name: input.name.trim(),
      email: input.email.trim(),
      role: "user" as const,
      password: input.password,
      created_at: new Date().toISOString(),
    };
    users = [...users, created];
    const { password: _pw, ...user } = created;
    return { token: `mock-token-${user.id}`, user };
  },

  async me(token: string): Promise<User> {
    await delay(150);
    const id = Number(token.replace("mock-token-", ""));
    const found = users.find((u) => u.id === id);
    if (!found) throw { message: "Unauthenticated.", status: 401 };
    const { password: _pw, ...user } = found;
    return user;
  },

  async logout(): Promise<void> {
    await delay(150);
  },

  async updateProfile(id: number, data: { name: string; email: string }): Promise<User> {
    await delay(600);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw { message: "User not found", status: 404 };
    const updated = { ...users[index]!, ...data };
    users = users.map((u) => (u.id === id ? updated : u));
    const { password: _pw, ...user } = updated;
    return user;
  },

  count(): number {
    return users.length;
  },
};
