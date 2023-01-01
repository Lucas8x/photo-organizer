import { contextBridge, ipcRenderer, shell } from 'electron';

import fs from 'fs';
import path from 'path';

interface DialogResponse {
  canceled: boolean;
  filePaths: Array<string>;
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

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
