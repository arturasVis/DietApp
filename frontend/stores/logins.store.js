import { create } from "zustand";
export const LoginStore = create((set) => ({
  token: "",
  login: async (username, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (!res.ok) throw new Error("Login failed");

      const data = res.json;
      const newToken = data.token;
      set(() => ({
        token: newToken,
      }));
      return newToken;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  },
  setToke: (newToken) => set({ token: newToken }),
}));
