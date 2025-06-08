import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LoginStore = create(
  persist(
    (set) => ({
      token: "",
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.msg || "Login failed");
          }

          set({
            token: data.token,
            isLoading: false,
            error: null,
          });
          return data.token;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },
      logout: () => {
        set({
          token: "",
          error: null,
        });
      },
      setToken: (newToken) => set({ token: newToken }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
