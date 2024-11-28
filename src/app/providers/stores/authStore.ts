import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: string | null;
  modalOpen: "login" | "signup" | null;
  login: (username: string) => void;
  logout: () => void;
  openModal: (modal: "login" | "signup") => void;
  closeModal: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  modalOpen: null,
  login: (username) => set({ isAuthenticated: true, user: username }),
  logout: () => set({ isAuthenticated: false, user: null }),
  openModal: (modal) => set({ modalOpen: modal }),
  closeModal: () => set({ modalOpen: null }),
}));
