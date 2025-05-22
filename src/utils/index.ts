import * as fs from '@tauri-apps/plugin-fs';
import { path } from '@tauri-apps/api';
import { toast } from 'react-toastify';
import { FILE_TYPES } from '../constants';

export function getPathBasename(path: string): string {
  return path.replace('\\', '/')?.split('/').reverse()[0] || '';
}

export function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function filterFiles(files: fs.DirEntry[]) {
  return files.filter(
    (i) =>
      i.isFile &&
      FILE_TYPES.includes(
        getFileExtension(i.name) as (typeof FILE_TYPES)[number],
      ),
  );
}

export async function getNewestFilePath(folderPath: string): Promise<string> {
  const folderFiles = await fs.readDir(folderPath);
  if (folderFiles.length === 0) return '';

  const filteredFiles = filterFiles(folderFiles);
  if (filteredFiles.length === 0) return '';

  const arr = [];

  for (const file of filteredFiles) {
    const { isFile, mtime } = await fs.stat(
      await path.join(folderPath, file.name),
    );

    if (!isFile) continue;

    arr.push({
      path: file.name,
      mtime: mtime?.getTime() || 0,
    });
  }

  const img = arr.sort((a, b) => a.mtime - b.mtime)?.[0];

  if (!img) {
    return '';
  }

  return await path.join(folderPath, img.path);

  //return await path.join(folderPath, filteredFiles[0].name);
}

export async function loadFolderFiles(path: string): Promise<string[]> {
  try {
    const files = await fs.readDir(path);
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
  if (!latestPath) return;

  const exists = await fs.exists(latestPath);
  if (!exists) return;

  return latestPath;
}

export function changeKeyKeepOrder<T>(
  obj: T,
  oldKey: string,
  newKey: string,
  value: unknown,
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) =>
      key === oldKey ? [newKey, value] : [key, val],
    ),
  ) as T;
}
