import { delay } from "./apiClient";
import { authService } from "./authService";

export const userService = {
  async count(): Promise<number> {
    await delay(200);
    return authService.count();
  },
  updateProfile: authService.updateProfile,
};
