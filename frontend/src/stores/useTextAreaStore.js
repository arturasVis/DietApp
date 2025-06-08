import { create } from "zustand";

const useTextAreaStore = create((set) => ({
  inputText: " ",
  submitText: " ",

  setInputValue: (value) => set({ inputText: value }),
  submitInput: () =>
    set((state) => ({
      submitText: state.inputText,
      inputText: "",
    })),
}));

export default useTextAreaStore;
