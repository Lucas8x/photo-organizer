import { createContext, ReactNode, useContext, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';

import { useBridge } from '../hooks/useBridge';
import { KeybindsContext } from './keybindsContext';

interface AppContextProps {
  children: ReactNode;
}

interface AppContextData {
  files: Array<any>;
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
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppContextProps) {
  const { loadFolder, resolveImagePath, basename, copyFile, moveFile } =
    useBridge();
  const { keybinds } = useContext(KeybindsContext);

  const [isModalKeybindOpen, setIsModalKeybindOpen] = useState(false);
  const [currentFolderPath, setCurerntFolderPath] = useState<string>();
  const [files, setFiles] = useState<Array<string>>([]);
  const [isMovingFiles, setIsMovingFiles] = useState<boolean>(false);
  const [showingFolderPreviews, setShowingFolderPreviews] = useState(true);
  //const [copiedFiles, setCopiedFiles] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = files[currentIndex];
  const currentImagePath =
    currentImage &&
    currentFolderPath &&
    resolveImagePath(currentFolderPath, currentImage);

  const filesLength = files.length;

  useHotkeys(
    '*',
    (e) => triggerKeybind(e.key),
    { scopes: 'default', enabled: !isModalKeybindOpen },
    [keybinds, isModalKeybindOpen, currentIndex, filesLength]
  );

  function loadFiles(path: string) {
    try {
      const response = loadFolder(path);
      setFiles(response);
    } catch (error) {
      toast.error('Unable to read files in this folder.');
    }
  }

  function changeFolder(path: string) {
    if (!path) return;
    setCurerntFolderPath(path);
    loadFiles(path);
  }

  function switchCopyOrMove() {
    setIsMovingFiles((s) => !s);
  }

  function nextImage() {
    if (currentIndex + 1 >= filesLength) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((s) => s + 1);
  }

  function previousImage() {
    if (currentIndex === 0) {
      setCurrentIndex(filesLength - 1);
      return;
    }
    setCurrentIndex((s) => s - 1);
  }

  async function copyImage(destinationFolder: string) {
    if (!currentImagePath) return;

    try {
      const dest = resolveImagePath(
        destinationFolder,
        basename(currentImagePath)
      );
      copyFile(currentImagePath, dest);
      nextImage();
    } catch (error) {
      toast.error('Unable to copy this image.');
      console.error(error);
    }
  }

  function moveImage(destinationFolder: string) {
    if (!currentImagePath) return;

    try {
      const dest = resolveImagePath(
        destinationFolder,
        basename(currentImagePath)
      );
      moveFile(currentImagePath, dest);
      setFiles((s) => s.filter((f) => f !== currentImage));
      nextImage();
    } catch (error) {
      toast.error('Unable to move this image.');
      console.error(error);
    }
  }

  function triggerKeybind(key: string) {
    if (key === 'ArrowLeft') return previousImage();
    if (key === 'ArrowRight') return nextImage();

    const destinationFolder = keybinds[key];
    if (!destinationFolder) return;
    isMovingFiles ? moveImage(destinationFolder) : copyImage(destinationFolder);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}