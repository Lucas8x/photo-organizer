import { create } from 'zustand';

type ModalState = {
  isModalKeybindOpen: boolean;
  setIsModalKeybindOpen: (isModalOpen: boolean) => void;
};

export const useModal = create<ModalState>((set) => ({
  isModalKeybindOpen: false,
  setIsModalKeybindOpen: (b) => set({ isModalKeybindOpen: b }),
}));
