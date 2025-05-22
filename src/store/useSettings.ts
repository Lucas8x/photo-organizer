import { create } from 'zustand';
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware';
import { LOCALES } from '@/locales';
import { CONFLICT_HANDLE_OPTIONS, THEMES } from '@/constants';
import { updateHtmlTheme } from '@/utils/changeHtmlTheme';

type SettingsVariables = {
  theme: (typeof THEMES)[number];
  isMovingFiles: boolean;
  nextImgAfterCopy: boolean;
  showingFolderPreviews: boolean;
  language: (typeof LOCALES)[keyof typeof LOCALES];
  hideImageName: boolean;
  hideImageCount: boolean;
  hideHeaderQuickSettings: boolean;
  conflictHandling: (typeof CONFLICT_HANDLE_OPTIONS)[keyof typeof CONFLICT_HANDLE_OPTIONS];
};

type SettingsFunctions = {
  changeTheme: (theme: (typeof THEMES)[number]) => void;
  toggleIsMovingFiles: () => void;
  toggleNextImgAfterCopy: () => void;
  toggleShowingFolderPreviews: () => void;
  changeLanguage: (id: (typeof LOCALES)[keyof typeof LOCALES]) => void;
  toggleHideHeaderQuickSettings: () => void;
  toggleHideImageName: () => void;
  toggleHideImageCount: () => void;
  changeConflictHandling: (
    id: (typeof CONFLICT_HANDLE_OPTIONS)[keyof typeof CONFLICT_HANDLE_OPTIONS],
  ) => void;
  resetSettings: () => void;
};

const DEFAULT_SETTINGS: SettingsVariables = {
  theme: 'system',
  isMovingFiles: false,
  nextImgAfterCopy: true,
  showingFolderPreviews: true,
  language: LOCALES.ENGLISH,
  hideImageName: false,
  hideImageCount: false,
  hideHeaderQuickSettings: false,
  conflictHandling: CONFLICT_HANDLE_OPTIONS.BLOCK,
};

export const useSettings = create<SettingsVariables & SettingsFunctions>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...DEFAULT_SETTINGS,

        changeTheme: (theme) => {
          if (!THEMES.includes(theme)) {
            return;
          }
          set({ theme });
        },

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

        changeLanguage: (id) => {
          if (!Object.values(LOCALES).includes(id)) {
            return;
          }
          set({ language: id });
        },

        toggleHideImageName: () => {
          set((state) => ({ hideImageName: !state.hideImageName }));
        },

        toggleHideHeaderQuickSettings: () => {
          set((state) => ({
            hideHeaderQuickSettings: !state.hideHeaderQuickSettings,
          }));
        },

        toggleHideImageCount: () => {
          set((state) => ({ hideImageCount: !state.hideImageCount }));
        },

        changeConflictHandling: (id) => {
          if (!Object.values(CONFLICT_HANDLE_OPTIONS).includes(id)) {
            return;
          }
          set({ conflictHandling: id });
        },

        resetSettings: () => {
          set(DEFAULT_SETTINGS);
        },
      }),
      {
        name: 'settings',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

useSettings.subscribe((s) => s.theme, updateHtmlTheme, {
  fireImmediately: true,
});
