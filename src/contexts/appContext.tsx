import { path } from '@tauri-apps/api';
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
import { useFileStack, useKeybinds, useModal, useSettings } from '../store';
import {
  fileAction,
  loadFolderFiles,
  deleteFile,
  loadLastFolder,
} from '../utils';

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
    () =>
      files.length > 0
        ? `${currentFolderPath}\\${files[currentIndex]}`
        : undefined,
    [currentFolderPath, files, currentIndex],
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
    setCurrentIndex((s) => (s + 1 >= files.length ? 0 : s + 1));
  }, [files.length]);

  const previousImage = useCallback(
    () => setCurrentIndex((s) => (s === 0 ? files.length - 1 : s - 1)),
    [files.length],
  );

  const handleKeybind = useCallback(
    async (key: string) => {
      const destinationFolder = keybinds[key]?.path;
      if (!destinationFolder || !currentImagePath) return;

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
          setFiles((s) => s.filter((f) => f !== files[currentIndex]));
          setCurrentIndex((s) => (s >= files.length - 1 ? s - 1 : s));
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
      keybinds,
      currentImagePath,
      isMovingFiles,
      updateKeyPreview,
      pushToFileStack,
      nextImage,
      files,
      currentIndex,
      nextImgAfterCopy,
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
          popFileStack();
          setCurrentIndex((s) => s - 1);
          toast.success('Undone copy', { autoClose: 1000 });
        }
      } else {
        const { success } = await fileAction({
          action: 'move',
          src: lastPath,
          dest: originalPath,
        });

        const basename = await path.basename(originalPath);

        if (success) {
          setFiles((s) => [basename, ...s]);
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
    (async () => {
      const path = await loadLastFolder();
      if (!path) return;
      changeFolder(path);
    })();
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
