import { create } from "zustand";

export const RegisterStore = create((set) => ({
  isLoading: false,
  error: null,
  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      if (response.status === 400) {
        set({
          isLoading: false,
          error: data.msg || "Username already exists",
        });
        return false;
      }

      if (!response.ok) {
        set({
          isLoading: false,
          error: data.msg || "Registration Failed",
        });
        return false;
      }

      set({ isLoading: false, error: null });
      return true;
    } catch (error) {
      set({ isLoading: false, error: error.message || "Registration Failed" });
      return false;
    }
  },
}));
