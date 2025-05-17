import { create } from "zustand";

type CreateChallengeModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateChallengeModal = create<CreateChallengeModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
