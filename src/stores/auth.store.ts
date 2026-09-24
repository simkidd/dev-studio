import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/interfaces";
import {
  getUserCookie,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/cookie.utils";
import { apiClient } from "@/lib/axios";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: IUser, tokens: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: IUser) => void;
  logout: () => Promise<void>;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: (user, tokens) => {
        setAuthCookies(tokens, user);
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      logout: async () => {
        try {
          await apiClient.post("/auth/logout");
        } catch {
          // Ignore network errors during logout
        } finally {
          clearAuthCookies();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          if (typeof window !== "undefined") {
            window.location.href = "/admin/login";
          }
        }
      },

      initAuth: () => {
        const token = getAccessToken();
        const refreshToken = getRefreshToken();
        const userCookie = getUserCookie();

        if (token || refreshToken) {
          set({
            user: userCookie || get().user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "dev_portfolio_auth_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initAuth();
        }
      },
    }
  )
);
