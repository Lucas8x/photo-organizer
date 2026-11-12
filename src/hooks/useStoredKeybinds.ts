import { path } from '@tauri-apps/api';
import { useHotkeys } from 'react-hotkeys-hook';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
//import { CONFLICT_HANDLE_OPTIONS } from '@/constants';
import { fileAction } from '@/functions/fileActions';
import { useFileStack, useFiles, useKeybinds, useSettings } from '@/store';

export function useStoredKeybinds() {
  const intl = useIntl();

  const isMovingFiles = useSettings((s) => s.isMovingFiles);
  const nextImgAfterCopy = useSettings((s) => s.nextImgAfterCopy);

  const keybinds = useKeybinds((s) => s.keybinds);
  const updateKeyPreview = useKeybinds((s) => s.updateKeyPreview);

  const pushToFileStack = useFileStack((s) => s.pushToFileStack);

  const index = useFiles((s) => s.index);
  const files = useFiles((s) => s.files);
  const currentImagePath = useFiles((s) => s.currentImagePath);
  const removeFile = useFiles((s) => s.removeFile);
  const increaseIndex = useFiles((s) => s.increaseIndex);

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <ok>
  async function handleKeybind(key: string) {
    const destinationFolder = keybinds[key]?.path;
    if (!(destinationFolder && currentImagePath)) {
      return;
    }

    const destinationPath = await path.join(
      destinationFolder,
      await path.basename(currentImagePath)
    );

    const { success, error } = await fileAction({
      action: isMovingFiles ? 'move' : 'copy',
      src: currentImagePath,
      dest: destinationPath,
    });

    if (success) {
      if (isMovingFiles) {
        removeFile(files[index]);
      } else if (nextImgAfterCopy) {
        increaseIndex();
      }

      toast.success(
        intl.formatMessage({
          id: isMovingFiles ? 'toast.moved' : 'toast.copied',
        }),
        { autoClose: 1000 }
      );

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
        intl.formatMessage(
          {
            id: 'toast.error',
          },
          {
            action: intl.formatMessage({
              id: isMovingFiles ? 'toast.action.move' : 'toast.action.copy',
            }),
          }
        )
      );
      //`Unable to ${isMovingFiles ? 'move' : 'copy'} this image. ${error}`,
    }
  }

  useHotkeys(
    Object.keys(keybinds),
    (_, h) => {
      handleKeybind(h.hotkey);
    },
    {
      scopes: 'editor',
      splitKey: '+',
      useKey: true,
    },
    [keybinds, handleKeybind]
  );
}
