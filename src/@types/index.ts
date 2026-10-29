export type Keybind = {
  key: string;
  path: string;
};

export type KeybindsList = {
  [id: string]: {
    path: string;
    previewPath?: string;
  };
};

export type UpdateKeybindParams = {
  newKey?: string;
  path: string;
  previousKey: string;
};

export type UpdateKeyPreviewParams = {
  key: string;
  previewPath: string;
};
