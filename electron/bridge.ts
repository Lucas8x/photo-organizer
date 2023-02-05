import { contextBridge, ipcRenderer, shell } from 'electron';

import fs from 'fs';
import path from 'path';

interface DialogResponse {
  canceled: boolean;
  filePaths: Array<string>;
}

function getNewestFile(folderPath: string, files: string[]) {
  const arr = files
    .map((file) => {
      const stats = fs.statSync(path.join(folderPath, file));
      if (stats.isFile()) {
        return { path: file, mtime: stats.mtime.getTime() };
      }
    })
    .sort((a, b) => (b?.mtime || 0) - (a?.mtime || 0));

  return arr[0]?.path;
}

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },

  basename: (pth: string) => path.basename(pth),

  resolveImagePath: (folderPath: string, imgName: string) =>
    path.join(folderPath, imgName),

  loadFolder: (path: string) => fs.readdirSync(path),

  openFolderDialog: async (): Promise<DialogResponse> =>
    await ipcRenderer.invoke('openDialog'),

  openInFolder: (path: string) => shell.showItemInFolder(path),

  openFolder: (path: string) => shell.openPath(path),

  moveFile: (src: string, dest: string) => fs.renameSync(src, dest),

  copyFile: (src: string, dest: string) => fs.copyFileSync(src, dest),

  getNewestFile,

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
