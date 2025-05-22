import { create } from 'zustand';

type ModalState = {
  blockHotkeys: boolean;
  setBlockHotkeys: (b: boolean) => void;
};

export const useModal = create<ModalState>((set) => ({
  blockHotkeys: false,
  setBlockHotkeys: (b) => set({ blockHotkeys: b }),
}));
