import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DEFAULT_HOTKEYS = {
  'previous.image': 'ArrowLeft',
  'next.image': 'ArrowRight',
  undo: 'ctrl+z',
} as const;

export type AppAction = keyof typeof DEFAULT_HOTKEYS;

type AppControlStore = {
  actionsToKeybinds: Record<AppAction, string>;
  setKeybind: (action: AppAction, keybind: string) => boolean;
  restoreKeybind: (action: AppAction) => boolean;
  resetControls: () => void;
};

export const useAppControls = create<AppControlStore>()(
  persist(
    (set) => ({
      actionsToKeybinds: { ...DEFAULT_HOTKEYS },

      setKeybind: (action: AppAction, keybind: string) => {
        if (!Object.hasOwn(DEFAULT_HOTKEYS, action)) {
          return false;
        }

        set((state) => ({
          actionsToKeybinds: {
            ...state.actionsToKeybinds,
            [action]: keybind,
          },
        }));
        return true;
      },

      restoreKeybind: (action: AppAction) => {
        if (!Object.hasOwn(DEFAULT_HOTKEYS, action)) {
          return false;
        }

        set((state) => ({
          actionsToKeybinds: {
            ...state.actionsToKeybinds,
            [action]: DEFAULT_HOTKEYS[action],
          },
        }));
        return true;
      },

      resetControls: () => {
        set({
          actionsToKeybinds: DEFAULT_HOTKEYS,
        });
      },
    }),
    {
      name: 'app-controls',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
