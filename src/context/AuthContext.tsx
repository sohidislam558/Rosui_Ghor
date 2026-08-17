import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { TOKEN_STORAGE_KEY } from "@/services/apiClient";
import { authService, type LoginInput, type RegisterInput } from "@/services/authService";

export type AuthStatus =
  | "loading"
  | "authenticated_user"
  | "authenticated_admin"
  | "unauthenticated"
  | "authentication_error";

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  isReady: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const applyUser = useCallback((next: User) => {
    setUser(next);
    setStatus(next.role === "admin" ? "authenticated_admin" : "authenticated_user");
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setStatus("unauthenticated");
      return;
    }
    authService
      .me(token)
      .then(applyUser)
      .catch(() => {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        setUser(null);
        setStatus("unauthenticated");
      });
  }, [applyUser]);

  const login = useCallback(
    async (input: LoginInput) => {
      try {
        const { token, user: next } = await authService.login(input);
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        applyUser(next);
        return next;
      } catch (error) {
        setStatus("authentication_error");
        throw error;
      }
    },
    [applyUser],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const { token, user: next } = await authService.register(input);
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
      applyUser(next);
      return next;
    },
    [applyUser],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isReady: status !== "loading",
      isAuthenticated: status === "authenticated_user" || status === "authenticated_admin",
      isAdmin: status === "authenticated_admin",
      login,
      register,
      logout,
      updateUser: applyUser,
    }),
    [user, status, login, register, logout, applyUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
