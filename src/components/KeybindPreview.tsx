import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { shell, tauri } from '@tauri-apps/api';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { useMemo, useState } from 'react';
import { LuImageOff } from 'react-icons/lu';
import { getPathBasename } from '../utils';
import { IoTrash, IoFolder, IoPencilSharp } from 'react-icons/io5';

interface Props {
  keybind: string;
  path: string;
  showPreview?: boolean;
  previewPath?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function KeybindPreview({
  keybind,
  path,
  previewPath,
  showPreview,
  onEdit,
  onDelete,
}: Props) {
  const [imgError, setImgError] = useState(false);

  const pathName = useMemo(() => getPathBasename(path), [path]);

  const url = useMemo(
    () => previewPath && convertFileSrc(previewPath),
    [previewPath],
  );

  async function handleOpenFolder() {
    if (!path) return;
    await tauri.invoke('show_in_folder', { path });
    //shell.open(path);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-2 outline-none"
          aria-label="Keybind actions"
          title="Click to open keybind actions"
        >
          {showPreview && (
            <div className="flex size-11 items-center justify-center rounded-md bg-white">
              {!imgError ? (
                <img
                  className="size-11 rounded-md"
                  src={url}
                  alt=""
                  onError={() => setImgError(true)}
                />
              ) : (
                <LuImageOff className="size-6" />
              )}
            </div>
          )}

          <div className="flex flex-col justify-center text-start">
            <span className="text-white">
              Keybind: <b className="uppercase">{keybind}</b>
            </span>

            <span className="w-min text-white" title="Open folder">
              {pathName}
            </span>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex min-w-52 flex-col gap-1 rounded-md bg-white px-1 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
          side="top"
        >
          <DropdownMenu.Item
            className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white"
            onClick={handleOpenFolder}
          >
            <IoFolder className="size-4" />
            Open Folder
          </DropdownMenu.Item>

          {onEdit && (
            <DropdownMenu.Item
              className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow-600 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white"
              onClick={onEdit}
            >
              <IoPencilSharp className="size-4" />
              Edit key or path
            </DropdownMenu.Item>
          )}

          {onDelete && (
            <DropdownMenu.Item
              className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-red-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-700 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white"
              onClick={onDelete}
            >
              <IoTrash className="size-4" />
              Delete keybind
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
