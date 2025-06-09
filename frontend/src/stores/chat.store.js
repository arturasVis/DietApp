import { create } from "zustand";
import { LoginStore } from "./logins.store.js";
import { v4 as uuidv4 } from "uuid";

export const useChatGPTStore = create((set) => ({
  message: "",
  conversationId: uuidv4(),
  sendMessage: async (message) => {
    try {
      const token = LoginStore.getState().token;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: message,
          conversationId: useChatGPTStore.getState().conversationId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      const reply = data.reply;
      set(() => ({ message: reply }));
      return reply;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  },
  fetchChatHistory: async (conversationId) => {
    try {
      const token = LoginStore.getState().token;
      const res = await fetch(`/api/chat/history/${conversationId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await res.json();
      return data.messages;
    } catch (error) {
      console.error("Error fetching chat history: ", error);
      throw error;
    }
  },
  startNewConversation: () => {
    set({ conversationId: uuidv4() });
  },
}));
