import { toast } from 'react-toastify';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getNewestFilePath } from '../utils';

type KeybindsState = {
  keybinds: IKeybinds;
  addKeybind: (data: IKeybind) => Promise<boolean>;
  deleteKeybind: (key: string) => void;
  updateKeyPreview: (data: IUpdateKeyPreviewParams) => void;
  clearAll: () => void;
};

export const useKeybinds = create<KeybindsState>()(
  persist(
    (set, get) => ({
      keybinds: {},

      addKeybind: async ({ key, path }: IKeybind) => {
        if (get().keybinds[key]) {
          toast.error('This keybind already exist.');
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

        toast.success('Keybind registered.');
        return true;
      },

      /* updateKeybind: async ({
        previousKey,
        key,
        path,
      }: IUpdateKeybindParams) => {
        if (!get().keybinds[key]) {
          toast.error('This keybind does not exist.');
          return false;
        }

        const oldKeybind = get().keybinds[previousKey];
        const sameKey = previousKey === key;
        const samePath = oldKeybind.path === path;

        const previewPath = samePath
          ? oldKeybind.previewPath
          : await getNewestFilePath(path);

        set((s) => {
          !sameKey && delete s.keybinds[previousKey];

          return {
            keybinds: {
              ...s.keybinds,
              [key]: {
                path,
                previewPath,
              },
            },
          };
        });

        toast.success('Keybind updated.');
        return true;
      }, */

      deleteKeybind: (key: string) => {
        set((s) => {
          delete s.keybinds[key];
          return {
            keybinds: { ...s.keybinds },
          };
        });
      },

      updateKeyPreview: ({ key, previewPath }: IUpdateKeyPreviewParams) => {
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
