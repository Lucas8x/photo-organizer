import * as fs from '@tauri-apps/plugin-fs';

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
      await fs.rename(src, dest);
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
