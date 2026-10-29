import { path } from '@tauri-apps/api';
import { type DirEntry, exists, readDir, stat } from '@tauri-apps/plugin-fs';
import { toast } from 'react-toastify';
import { FILE_TYPES } from '../constants';

export function getPathBasename(pathName: string): string {
  return pathName.replace('\\', '/')?.split('/').reverse()[0] || '';
}

export function getFileExtension(fileName: string): string {
  const extensionIndex = fileName.lastIndexOf('.');
  return extensionIndex === -1 ? '' : fileName.slice(extensionIndex + 1);
}

export function filterFiles(files: DirEntry[]) {
  return files.filter(
    (i) =>
      i.isFile &&
      FILE_TYPES.includes(
        getFileExtension(i.name) as (typeof FILE_TYPES)[number]
      )
  );
}

export async function getNewestFilePath(folderPath: string): Promise<string> {
  const folderFiles = await readDir(folderPath);
  if (folderFiles.length === 0) {
    return '';
  }

  const filteredFiles = filterFiles(folderFiles);
  if (filteredFiles.length === 0) {
    return '';
  }

  const fileStats = await Promise.all(
    filteredFiles.map(async (file) => {
      const filePath = await path.join(folderPath, file.name);
      const { isFile, mtime } = await stat(filePath);
      return isFile ? { path: file.name, mtime: mtime?.getTime() || 0 } : null;
    })
  );
  const arr = fileStats.filter(
    (file): file is { path: string; mtime: number } => file !== null
  );

  const img = arr.sort((a, b) => a.mtime - b.mtime)?.[0];

  if (!img) {
    return '';
  }

  return await path.join(folderPath, img.path);

  //return await path.join(folderPath, filteredFiles[0].name);
}

export async function loadFolderFiles(pathName: string): Promise<string[]> {
  try {
    const files = await readDir(pathName);
    const filteredFiles = filterFiles(files).map((f) => f.name);
    return filteredFiles;
  } catch (error) {
    toast.error('Unable to read files in this folder.');
    console.error(error);
    return [];
  }
}

export async function getLatestPath() {
  const latestPath = localStorage.getItem('latestPath');
  if (!latestPath) {
    return;
  }

  if (!(await exists(latestPath))) {
    return;
  }

  return latestPath;
}

export function changeKeyKeepOrder<T extends object>(
  obj: T,
  oldKey: string,
  newKey: string,
  value: unknown
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) =>
      key === oldKey ? [newKey, value] : [key, val]
    )
  ) as T;
}
