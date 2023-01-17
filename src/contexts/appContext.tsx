import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';

import { KeybindsContext } from './keybindsContext';

import { useBridge } from '../hooks';
import { filterFiles } from '../utils';
import { FILE_TYPES } from '../constants';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextData {
  files: Array<string>;
  currentIndex: number | undefined;
  filesLength: number;
  isMovingFiles: boolean;
  currentImagePath: string | undefined;
  switchCopyOrMove: () => void;
  changeFolder: (path: string) => void;
  triggerKeybind: (key: string) => void;
  isModalKeybindOpen: boolean;
  setIsModalKeybindOpen: (b: boolean) => void;
  showingFolderPreviews: boolean;
  switchFolderPreview: () => void;
  nextImgAfterCopy: boolean;
  switchNextImageAfterCopy: () => void;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppContextProps) {
  const { loadFolder, resolveImagePath, basename, copyFile, moveFile } =
    useBridge();
  const { keybinds } = useContext(KeybindsContext);

  const [isModalKeybindOpen, setIsModalKeybindOpen] = useState(false);
  const [currentFolderPath, setCurerntFolderPath] = useState<string>();
  const [files, setFiles] = useState<Array<string>>([]);
  const [isMovingFiles, setIsMovingFiles] = useState(false);
  const [showingFolderPreviews, setShowingFolderPreviews] = useState(true);
  const [nextImgAfterCopy, setNextImgAfterCopy] = useState(true);
  //const [copiedFiles, setCopiedFiles] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = useMemo(
    () => files[currentIndex],
    [files, currentIndex]
  );

  const currentImagePath = useMemo(
    () =>
      currentImage &&
      currentFolderPath &&
      resolveImagePath(currentFolderPath, currentImage),
    [currentImage, currentFolderPath, resolveImagePath]
  );

  const filesLength = useMemo(() => files.length, [files.length]);

  useHotkeys(
    '*',
    (e) => triggerKeybind(e.key),
    { scopes: 'default', enabled: !isModalKeybindOpen },
    [
      keybinds,
      isModalKeybindOpen,
      isMovingFiles,
      currentIndex,
      filesLength,
      nextImgAfterCopy,
    ]
  );

  const loadFiles = useCallback(
    (path: string) => {
      try {
        const response = loadFolder(path);
        const filteredFiles = filterFiles(response, FILE_TYPES);
        setFiles(filteredFiles);
      } catch (error) {
        toast.error('Unable to read files in this folder.');
      }
    },
    [loadFolder]
  );

  const changeFolder = useCallback(
    (path: string) => {
      if (!path) return;
      setCurrentIndex(0);
      setCurerntFolderPath(path);
      loadFiles(path);
    },
    [loadFiles]
  );

  const nextImage = useCallback(() => {
    currentIndex + 1 >= filesLength
      ? setCurrentIndex(0)
      : setCurrentIndex((s) => s + 1);
  }, [currentIndex, filesLength]);

  const previousImage = useCallback(() => {
    currentIndex === 0
      ? setCurrentIndex(filesLength - 1)
      : setCurrentIndex((s) => s - 1);
  }, [currentIndex, filesLength]);

  const copyImage = useCallback(
    (destinationFolder: string) => {
      if (!currentImagePath) return;

      try {
        const dest = resolveImagePath(
          destinationFolder,
          basename(currentImagePath)
        );
        copyFile(currentImagePath, dest);
        nextImgAfterCopy && nextImage();
        toast.success('Copied', { autoClose: 1500 });
      } catch (error) {
        toast.error('Unable to copy this image.');
        console.error(error);
      }
    },
    [
      currentImagePath,
      resolveImagePath,
      basename,
      copyFile,
      nextImgAfterCopy,
      nextImage,
    ]
  );

  const moveImage = useCallback(
    (destinationFolder: string) => {
      if (!currentImagePath) return;

      try {
        const dest = resolveImagePath(
          destinationFolder,
          basename(currentImagePath)
        );
        moveFile(currentImagePath, dest);
        setFiles((s) => s.filter((f) => f !== currentImage));

        toast.success('Moved', { autoClose: 1500 });
      } catch (error) {
        toast.error('Unable to move this image.');
        console.error(error);
      }
    },
    [currentImagePath, resolveImagePath, basename, moveFile, currentImage]
  );

  const triggerKeybind = useCallback(
    (key: string) => {
      if (key === 'ArrowLeft') return previousImage();
      if (key === 'ArrowRight') return nextImage();

      const destinationFolder = keybinds[key];
      if (!destinationFolder) return;
      isMovingFiles
        ? moveImage(destinationFolder)
        : copyImage(destinationFolder);
    },
    [isMovingFiles, moveImage, copyImage, previousImage, nextImage, keybinds]
  );

  function switchCopyOrMove() {
    setIsMovingFiles((s) => !s);
  }

  function switchFolderPreview() {
    setShowingFolderPreviews((s) => !s);
  }

  function switchNextImageAfterCopy() {
    setNextImgAfterCopy((s) => !s);
  }

  return (
    <AppContext.Provider
      value={{
        files,
        currentIndex,
        filesLength,
        currentImagePath,
        isMovingFiles,
        switchCopyOrMove,
        changeFolder,
        triggerKeybind,
        isModalKeybindOpen,
        setIsModalKeybindOpen,
        showingFolderPreviews,
        switchFolderPreview,
        nextImgAfterCopy,
        switchNextImageAfterCopy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
