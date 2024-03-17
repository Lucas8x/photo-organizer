import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SettingsState = {
  isMovingFiles: boolean;
  nextImgAfterCopy: boolean;
  showingFolderPreviews: boolean;
  toggleIsMovingFiles: () => void;
  toggleNextImgAfterCopy: () => void;
  toggleShowingFolderPreviews: () => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      isMovingFiles: false,
      nextImgAfterCopy: true,
      showingFolderPreviews: true,

      toggleIsMovingFiles: () => {
        set((state) => ({ isMovingFiles: !state.isMovingFiles }));
      },

      toggleNextImgAfterCopy: () => {
        set((state) => ({ nextImgAfterCopy: !state.nextImgAfterCopy }));
      },

      toggleShowingFolderPreviews: () => {
        set((state) => ({
          showingFolderPreviews: !state.showingFolderPreviews,
        }));
      },
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
