import * as fs from '@tauri-apps/plugin-fs';

export async function deleteFile(path: string) {
  try {
    await fs.remove(path);

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
