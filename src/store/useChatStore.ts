import { create } from "zustand";
import type { ChatState } from "../types/types";

export const useChatStore = create<ChatState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  clearFile: () => set({ file: null }),
}));
