import { create } from 'zustand';

type FileEntry = {
  originalPath: string;
  lastPath: string;
  lastAction: 'copy' | 'move';
};

type FileStackState = {
  stack: FileEntry[];
  getLastStackFile: () => FileEntry | undefined;
  pushToFileStack: (entry: FileEntry) => void;
  popFileStack: () => void;
  clearFileStack: () => void;
};

export const useFileStack = create<FileStackState>((set, get) => ({
  stack: [],

  getLastStackFile: () => {
    const { stack } = get();
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }
  },

  pushToFileStack: (file: FileEntry) =>
    set((state) => ({ stack: [...state.stack, file] })),

  popFileStack: () => set((state) => ({ stack: state.stack.slice(0, -1) })),

  clearFileStack: () => set(() => ({ stack: [] })),
}));
