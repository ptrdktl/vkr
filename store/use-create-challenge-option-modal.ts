import { create } from "zustand";

type CreateChallengeOptionModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateChallengeOptionModal =
  create<CreateChallengeOptionModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }));
