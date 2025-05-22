import { create } from 'zustand';
import { createComputed } from 'zustand-computed';
import { useFileStack } from './useFileStack';
import { getLatestPath, loadFolderFiles } from '@/utils';

type FileState = {
  files: string[];
  index: number;
  currentFolderPath: string;
  changeFolder: (path: string) => Promise<void>;
  loadLatestFolder: () => Promise<void>;
  appendFile: (filePath: string) => void;
  removeFile: (filePath: string) => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
  setIndex: (index: number) => void;
};

const computed = createComputed((s: FileState) => ({
  currentImagePath:
    s.files.length > 0
      ? `${s.currentFolderPath}\\${s.files[s.index]}`
      : undefined,
}));

export const useFiles = create<FileState>()(
  computed((set, get) => ({
    files: [],
    index: 0,
    currentFolderPath: '',
    currentImagePath: '',

    changeFolder: async (path) => {
      set({
        files: [],
        index: 0,
        currentFolderPath: path,
      });

      useFileStack.getState().clearFileStack();

      localStorage.setItem('latestPath', path);

      if (!path) return;

      const files = await loadFolderFiles(path);
      set({ files });
    },

    loadLatestFolder: async () => {
      const path = await getLatestPath();
      if (!path) return;
      get().changeFolder(path);
    },

    appendFile: (filePath) => {
      set((s) => ({
        files: [...s.files, filePath],
      }));
    },

    removeFile: (filePath) => {
      set((s) => ({
        files: s.files.filter((file) => file !== filePath),
        index: s.index >= s.files.length - 1 ? s.index - 1 : s.index,
      }));
    },

    increaseIndex: () => {
      set((s) => ({
        index: s.index + 1 >= s.files.length ? 0 : s.index + 1,
      }));
    },

    decreaseIndex: () => {
      set((s) => ({
        index: s.index === 0 ? s.files.length - 1 : s.index - 1,
      }));
    },

    setIndex: (index) => {
      if (index < 0 || index >= get().files.length) {
        return;
      }
      set({ index });
    },
  })),
);
