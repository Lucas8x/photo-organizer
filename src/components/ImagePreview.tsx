import { shell, tauri } from '@tauri-apps/api';
import { useCallback, useMemo } from 'react';
import { PREVIEW_IMAGE } from '../constants';
import { useApp } from '../contexts/appContext';

import { useJoyride } from '../store';

export function ImagePreview() {
  const { currentImagePath, currentIndex, files, currentFolderPath } = useApp();
  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);

  const url = useMemo(
    () =>
      isJoyrideRunning
        ? PREVIEW_IMAGE
        : currentImagePath && tauri.convertFileSrc(currentImagePath),
    [isJoyrideRunning, currentImagePath],
  );

  const count = useMemo(
    () =>
      `${currentIndex !== undefined ? currentIndex + (files.length > 0 ? 1 : 0) : '-'}/${files.length}`,
    [currentIndex, files.length],
  );

  const handlePathClick = useCallback(async () => {
    if (!currentImagePath) return;
    await tauri.invoke('show_in_folder', { path: currentImagePath });
    //shell.open(currentImagePath);
  }, [currentImagePath]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-800">
      {currentImagePath || isJoyrideRunning ? (
        <>
          <button
            className="flex items-center truncate text-center font-bold leading-8 text-white"
            title="Click to show this image in file explorer"
            onClick={handlePathClick}
          >
            {currentImagePath}
          </button>

          <div className="relative flex h-full w-full items-center justify-center p-2">
            <img
              className="absolute h-full rounded-lg object-contain"
              src={url}
              alt=""
              id="joyride-image"
            />
          </div>

          <span className="font-bold text-white">{count}</span>
        </>
      ) : (
        <span className="font-bold text-white">
          {currentFolderPath && files.length === 0
            ? 'No Images found'
            : 'NO FOLDER SELECTED'}
        </span>
      )}
    </div>
  );
}
