import { create } from "zustand";

export const useChatGPTStore = create((set) => ({
  message: "",
  sendMessage: async (message) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      const data = await res.json();
      const reply = data.reply;
      set(() => ({ message: reply }));
      return reply;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  },
}));
