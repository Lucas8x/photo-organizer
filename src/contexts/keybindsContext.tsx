import { createContext, ReactNode, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { FILE_TYPES } from '../constants';
import { useBridge } from '../hooks';
import { filterFiles } from '../utils';

interface KeybindsContextProps {
  children: ReactNode;
}

interface KeybindsContextData {
  keybinds: IKeybinds;
  addKeybind: (data: IKeybind) => boolean;
  deleteKeybind: (key: string) => void;
  updateKeyPreview: (data: IUpdateKeyPreviewParams) => void;
  clearAll: () => void;
}

export const KeybindsContext = createContext({} as KeybindsContextData);

export function KeybindsProvider({ children }: KeybindsContextProps) {
  const { loadFolder, getNewestFile, resolveImagePath } = useBridge();
  const [keybinds, setKeybinds] = useState<IKeybinds>({});

  const addKeybind = useCallback(
    ({ key, path }: IKeybind) => {
      if (keybinds[key]) {
        toast.error('This keybind already exist.');
        return false;
      }

      const folderFiles = loadFolder(path);

      const filteredFiles =
        folderFiles.length > 0 && filterFiles(folderFiles, FILE_TYPES);

      const newestFile = filteredFiles && getNewestFile(path, filteredFiles);

      const newestFilePath = newestFile
        ? resolveImagePath(path, newestFile)
        : undefined;

      setKeybinds((s) => ({
        ...s,
        [key]: {
          path,
          previewPath: newestFilePath,
        },
      }));
      toast.success('Keybind registered.');

      return true;
    },
    [keybinds, loadFolder, getNewestFile, resolveImagePath]
  );

  const deleteKeybind = useCallback(
    (key: string) =>
      setKeybinds((s) => {
        delete s[key];
        return s;
      }),
    []
  );

  const updateKeyPreview = useCallback(({ key, previewPath }) => {
    setKeybinds((s) => ({
      ...s,
      [key]: {
        ...s[key],
        previewPath: previewPath,
      },
    }));
  }, []);

  const clearAll = useCallback(() => setKeybinds({}), []);

  return (
    <KeybindsContext.Provider
      value={{
        keybinds,
        addKeybind,
        deleteKeybind,
        updateKeyPreview,
        clearAll,
      }}
    >
      {children}
    </KeybindsContext.Provider>
  );
}
