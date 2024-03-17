import { fs, path } from '@tauri-apps/api';
import { type FileEntry } from '@tauri-apps/api/fs';
import { toast } from 'react-toastify';
import { FILE_TYPES } from '../constants';

export function getPathBasename(path: string): string {
  return path.replace('\\', '/').split('/').reverse()[0] || '';
}

export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function filterFiles(
  files: FileEntry[],
  validExtensions: string[],
): fs.FileEntry[] {
  return files.filter((file) =>
    validExtensions.includes(getFileExtension(file.path)),
  );
}

export async function getNewestFilePath(folderPath: string): Promise<string> {
  const folderFiles = await fs.readDir(folderPath);
  if (folderFiles.length === 0) return '';

  const filteredFiles = filterFiles(folderFiles, FILE_TYPES);
  if (filteredFiles.length === 0) return '';

  /* const arr = files
    .map((file) => {
      const stats = fs.statSync(path.join(folderPath, file));
      if (stats.isFile()) {
        return {
          path: file,
          mtime: stats.mtime.getTime(),
        };
      }
    })
    .sort((a, b) => (b?.mtime || 0) - (a?.mtime || 0));*/

  return filteredFiles[0].path;
}

export async function loadFolderFiles(path: string): Promise<string[]> {
  try {
    const files = await fs.readDir(path);
    const filteredFiles = filterFiles(files, FILE_TYPES);
    return filteredFiles.map((f) => f.path);
  } catch (error) {
    toast.error('Unable to read files in this folder.');
    console.error(error);
    return [];
  }
}

type FileAction = 'copy' | 'move';

type Props = {
  action?: FileAction;
  src: string;
  dest: string;
};

type ReturnType = {
  success: boolean;
  error: string | null;
};

export async function fileAction({
  action = 'copy',
  src,
  dest,
}: Props): Promise<ReturnType> {
  try {
    if (!src) {
      throw new Error('No source path provided.');
    }

    if (!dest) {
      throw new Error('No destination path provided.');
    }

    const exists = await fs.exists(dest);

    if (exists) {
      throw new Error('File already exists.');
    }

    if (action === 'move') {
      await fs.renameFile(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[fileAction]`, error);
    return {
      success: false,
      error: msg,
    };
  }
}

export async function deleteFile(path: string) {
  try {
    await fs.removeFile(path);
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(`[deleteFile]`, error);
    return {
      success: false,
      error,
    };
  }
}
