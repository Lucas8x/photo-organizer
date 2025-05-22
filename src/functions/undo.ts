import { path } from '@tauri-apps/api';
import { toast } from 'react-toastify';
import { useFiles, useFileStack } from '@/store';
import { deleteFile } from './deleteFile';
import { fileAction } from './fileActions';

export async function undo() {
  const { getLastStackFile, popFileStack } = useFileStack.getState();
  const { decreaseIndex, appendFile } = useFiles.getState();

  const lastFile = getLastStackFile();

  if (!lastFile) {
    return;
  }

  const { lastAction, lastPath, originalPath } = lastFile;

  if (lastAction === 'copy') {
    const { success } = await deleteFile(lastPath);

    if (!success) {
      return;
    }

    popFileStack();
    decreaseIndex();
    toast.success('Undone copy', { autoClose: 1000 });

    return;
  }

  const { success } = await fileAction({
    action: 'move',
    src: lastPath,
    dest: originalPath,
  });

  if (!success) {
    return;
  }

  const basename = await path.basename(originalPath);

  popFileStack();
  appendFile(basename);
  toast.success('Undone move', { autoClose: 1000 });
}
