import { create } from "zustand";

type CreateUnitModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateUnitModal = create<CreateUnitModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
