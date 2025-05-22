/* eslint-disable @typescript-eslint/no-unused-vars */

interface IKeybind {
  key: string;
  path: string;
}

interface IKeybinds {
  [id: string]: {
    path: string;
    previewPath?: string;
  };
}

interface IUpdateKeybindParams {
  path: string;
  previousKey: string;
  newKey?: string;
}

interface IUpdateKeyPreviewParams {
  key: string;
  previewPath: string;
}
