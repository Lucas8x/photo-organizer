import { fs, path } from '@tauri-apps/api';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';
import { useKeybinds, useModal, useSettings } from '../store';
import { fileAction, loadFolderFiles, deleteFile } from '../utils';
import { useFileStack } from '../store/useFileStack';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextData {
  currentFolderPath: string;
  files: Array<string>;
  currentIndex: number | undefined;
  currentImagePath: string | undefined;
  changeFolder: (path: string) => void;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppContextProps) {
  const isModalKeybindOpen = useModal((s) => s.isModalKeybindOpen);

  const isMovingFiles = useSettings((s) => s.isMovingFiles);
  const nextImgAfterCopy = useSettings((s) => s.nextImgAfterCopy);

  const keybinds = useKeybinds((s) => s.keybinds);
  const updateKeyPreview = useKeybinds((s) => s.updateKeyPreview);

  const pushToFileStack = useFileStack((s) => s.pushToFileStack);
  const getLastStackFile = useFileStack((s) => s.getLastStackFile);
  const popFileStack = useFileStack((s) => s.popFileStack);
  const clearFileStack = useFileStack((s) => s.clearFileStack);

  const [files, setFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFolderPath, setCurrentFolderPath] = useState('');

  const currentImagePath = useMemo(
    () => files[currentIndex],
    [files, currentIndex],
  );

  const changeFolder = useCallback(
    async (path: string) => {
      setFiles([]);
      setCurrentIndex(0);
      setCurrentFolderPath(path);
      clearFileStack();
      localStorage.setItem('latestPath', path);
      if (!path) return;
      const files = await loadFolderFiles(path);
      setFiles(files);
    },
    [clearFileStack],
  );

  const nextImage = useCallback(() => {
    setCurrentIndex((s) => {
      const isLastImage = s === files.length - 1;

      if (isMovingFiles) {
        return isLastImage ? 0 : s;
      }

      return s + 1 >= files.length ? 0 : s + 1;
    });
  }, [files.length, isMovingFiles]);

  const previousImage = useCallback(
    () => setCurrentIndex((s) => (s === 0 ? files.length - 1 : s - 1)),
    [files.length],
  );

  const handleKeybind = useCallback(
    async (key: string) => {
      const destinationFolder = keybinds[key]?.path;
      if (!destinationFolder) return;

      const destinationPath = await path.join(
        destinationFolder,
        await path.basename(currentImagePath),
      );

      const { success, error } = await fileAction({
        action: isMovingFiles ? 'move' : 'copy',
        src: currentImagePath,
        dest: destinationPath,
      });

      if (success) {
        if (isMovingFiles) {
          setFiles((s) => s.filter((f) => f !== currentImagePath));
          nextImage();
        } else {
          nextImgAfterCopy && nextImage();
        }

        toast.success(isMovingFiles ? 'Moved' : 'Copied', { autoClose: 1000 });

        updateKeyPreview({
          key,
          previewPath: destinationPath,
        });

        pushToFileStack({
          originalPath: currentImagePath,
          lastPath: destinationPath,
          lastAction: isMovingFiles ? 'move' : 'copy',
        });
      }

      if (error) {
        toast.error(
          `Unable to ${isMovingFiles ? 'move' : 'copy'} this image. ${error}`,
        );
      }
    },
    [
      nextImage,
      keybinds,
      currentImagePath,
      isMovingFiles,
      updateKeyPreview,
      nextImgAfterCopy,
      pushToFileStack,
    ],
  );

  const handleUndo = useCallback(() => {
    async function undo() {
      const lastFile = getLastStackFile();
      if (!lastFile) return;

      const { originalPath, lastPath, lastAction } = lastFile;

      if (lastAction === 'copy') {
        const { success } = await deleteFile(lastPath);

        if (success) {
          toast.success('Undone copy', { autoClose: 1000 });
          popFileStack();
        }
      } else {
        const { success } = await fileAction({
          action: 'move',
          src: lastPath,
          dest: originalPath,
        });

        if (success) {
          setFiles((s) => [...s, lastPath]);
          toast.success('Undone move', { autoClose: 1000 });
          popFileStack();
        }
      }
    }

    undo();
  }, [getLastStackFile, popFileStack]);

  useHotkeys(
    Object.keys(keybinds),
    (e) => handleKeybind(e.key),
    {
      enabled: !isModalKeybindOpen,
    },
    [keybinds, handleKeybind],
  );

  useHotkeys(
    'ArrowLeft',
    previousImage,
    {
      enabled: !isModalKeybindOpen,
    },
    [previousImage],
  );

  useHotkeys(
    'ArrowRight',
    nextImage,
    {
      enabled: !isModalKeybindOpen,
    },
    [nextImage],
  );

  useHotkeys(
    'ctrl+z',
    handleUndo,
    {
      enabled: !isModalKeybindOpen,
    },
    [handleUndo],
  );

  useEffect(() => {
    async function loadLatestFolder() {
      const latestPath = localStorage.getItem('latestPath');
      if (!latestPath) return;

      const exists = await fs.exists(latestPath);
      if (!exists) return;

      changeFolder(latestPath);
    }

    loadLatestFolder();
  }, [changeFolder]);

  return (
    <AppContext.Provider
      value={{
        currentFolderPath,
        files,
        currentIndex,
        currentImagePath,
        changeFolder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const app = useContext(AppContext);
  return app;
}
