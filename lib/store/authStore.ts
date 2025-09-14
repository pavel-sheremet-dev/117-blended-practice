import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: null | User;
  theme: "light" | "dark";
  toggleTheme: () => void;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => {
  return {
    user: null,
    theme: "light",
    toggleTheme: () =>
      set((prev) => ({ theme: prev.theme === "light" ? "dark" : "light" })),
    isAuthenticated: false,
    setUser: (user) => set(() => ({ user, isAuthenticated: true })),
    clearIsAuthenticated: () =>
      set(() => ({ user: null, isAuthenticated: false })),
  };
});
