import { path } from '@tauri-apps/api';
import { convertFileSrc, invoke } from '@tauri-apps/api/core';
import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PREVIEW_IMAGE } from '@/constants/imagePlaceholder';
import { useFiles, useJoyride, useSettings } from '@/store';
import { ImageCountInput } from './ImageCountInput';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

export function ImagePreview() {
  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);

  const files = useFiles((s) => s.files);
  const currentImagePath = useFiles((s) => s.currentImagePath);
  const currentFolderPath = useFiles((s) => s.currentFolderPath);

  const hideImageName = useSettings((s) => s.hideImageName);

  const canShowImage = currentImagePath || isJoyrideRunning;

  const url = useMemo(
    () => currentImagePath && convertFileSrc(currentImagePath),
    [currentImagePath],
  );

  const handlePathClick = useCallback(async () => {
    if (!currentImagePath) return;
    await invoke('show_in_folder', {
      path: await path.normalize(currentImagePath),
    });
  }, [currentImagePath]);

  return (
    <div className="flex h-full w-full py-1">
      {canShowImage ? (
        <div className="flex h-full w-full flex-col items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center truncate text-center font-bold leading-8 data-[hidden=true]:hidden dark:text-white"
                  onClick={handlePathClick}
                  data-hidden={hideImageName}
                >
                  {currentImagePath?.split('\\').reverse()[0]}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <FormattedMessage id="show.in.file.explorer" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="relative flex h-full w-full items-center justify-center p-2">
            <img
              className="absolute h-full rounded-md object-contain"
              src={isJoyrideRunning ? PREVIEW_IMAGE : url}
              alt=""
              id="joyride-image"
            />
          </div>

          <ImageCountInput />
        </div>
      ) : (
        <span className="flex w-full flex-col items-center self-center font-bold dark:text-white">
          <FormattedMessage
            id={
              currentFolderPath && files.length === 0
                ? 'no.images.found'
                : 'no.folder.selected'
            }
          />
          {(!currentFolderPath || files.length === 0) && (
            <span className="rotate-90">{':('}</span>
          )}
        </span>
      )}
    </div>
  );
}
