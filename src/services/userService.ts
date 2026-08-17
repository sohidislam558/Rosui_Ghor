import { authService } from "./authService";
import { apiClient } from "./apiClient";

export const userService = {
  async count(): Promise<number> {
    try {
      const res = await apiClient.get<{ total_users: number }>("/admin/statistics");
      return res.data.total_users;
    } catch {
      return 0;
    }
  },
  updateProfile: authService.updateProfile,
};
