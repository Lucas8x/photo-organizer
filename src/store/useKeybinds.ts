import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { changeKeyKeepOrder, getNewestFilePath } from '../utils';

type KeybindsState = {
  keybinds: IKeybinds;
  addKeybind: (params: IKeybind) => Promise<boolean>;
  updateKeybind: (params: IUpdateKeybindParams) => Promise<boolean>;
  deleteKeybind: (key: string) => void;
  updateKeyPreview: (params: IUpdateKeyPreviewParams) => void;
  clearAll: () => void;
};

export const useKeybinds = create<KeybindsState>()(
  persist(
    (set, get) => ({
      keybinds: {},

      addKeybind: async ({ key, path }) => {
        if (get().keybinds[key]) {
          return false;
        }

        const previewPath = await getNewestFilePath(path);

        set((s) => ({
          keybinds: {
            ...s.keybinds,
            [key]: {
              path,
              previewPath,
            },
          },
        }));

        return true;
      },

      updateKeybind: async ({ path, previousKey, newKey }) => {
        const { keybinds } = get();

        if (!previousKey || !keybinds[previousKey]) {
          return false;
        }

        const previewPath = await getNewestFilePath(path);

        if ((previousKey && !newKey) || previousKey === newKey) {
          console.log(`Keybind > ${previousKey} < updated path to: ${path}`);
          set((s) => ({
            keybinds: {
              ...s.keybinds,
              [previousKey]: {
                path,
                previewPath,
              },
            },
          }));

          return true;
        }

        if (newKey && newKey !== previousKey && !keybinds[newKey]) {
          console.log(
            `Keybind > ${previousKey} < updated to > ${newKey} < and path: ${path}`,
          );
          set((s) => ({
            keybinds: changeKeyKeepOrder(s.keybinds, previousKey, newKey, {
              path,
              previewPath,
            }),
          }));

          return true;
        }

        return false;
      },

      deleteKeybind: (key) => {
        set((s) => {
          delete s.keybinds[key];
          return {
            keybinds: { ...s.keybinds },
          };
        });
      },

      updateKeyPreview: ({ key, previewPath }) => {
        if (!previewPath) return;

        set((s) => ({
          keybinds: {
            ...s.keybinds,
            [key]: {
              ...s.keybinds[key],
              previewPath,
            },
          },
        }));
      },

      clearAll: () => {
        set(() => ({
          keybinds: {},
        }));
      },
    }),
    {
      name: 'keybinds',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
