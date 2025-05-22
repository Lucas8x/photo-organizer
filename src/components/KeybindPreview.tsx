import { convertFileSrc, invoke } from '@tauri-apps/api/core';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useMemo, useState } from 'react';
import { LuImageOff } from 'react-icons/lu';
import { FormattedMessage } from 'react-intl';
import { IoTrash, IoFolder, IoPencilSharp } from 'react-icons/io5';
import { getPathBasename } from '../utils';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import { ModalConfirmation } from '@/modals/ModalConfirmation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

interface Props {
  keybind: string;
  path: string;
  showPreview?: boolean;
  previewPath?: string;
  onEdit?: () => void;
  onDelete: () => void;
}

export function KeybindPreview({
  keybind,
  path,
  previewPath,
  showPreview,
  onEdit,
  onDelete,
}: Props) {
  const [imgError, setImgError] = useState(previewPath === undefined);

  const url = useMemo(() => {
    if (!showPreview) return;
    setImgError(false);
    return previewPath && convertFileSrc(previewPath);
  }, [showPreview, previewPath]);

  async function handleOpenFolder() {
    if (!path) return;
    await invoke('show_in_folder', { path });
  }

  return (
    <Dialog>
      <DropdownMenu.Root>
        <TooltipProvider>
          <Tooltip>
            <DropdownMenu.Trigger asChild>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center gap-2 outline-none"
                  aria-label="Keybind actions"
                >
                  <div
                    className="flex size-11 items-center justify-center rounded-md bg-neutral-200 data-[hidden=true]:hidden dark:bg-zinc-700"
                    data-hidden={!showPreview}
                  >
                    {imgError ? (
                      <LuImageOff className="size-6 dark:text-neutral-200" />
                    ) : (
                      <img
                        className="size-11 rounded-md"
                        src={url}
                        alt=""
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center text-start">
                    <span className="dark:text-white">
                      <FormattedMessage id="keybind" />:{' '}
                      <b className="uppercase">{keybind}</b>
                    </span>

                    <span className="w-min dark:text-white">
                      {getPathBasename(path).split('\\').slice(-2).join('/')}
                    </span>
                  </div>
                </button>
              </TooltipTrigger>
            </DropdownMenu.Trigger>

            <TooltipContent>
              <FormattedMessage id="keybind.title" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="flex min-w-60 flex-col gap-1 rounded-md bg-white px-1 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
            side="top"
          >
            <DropdownMenu.Item
              className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white"
              onClick={handleOpenFolder}
            >
              <IoFolder className="size-4" />
              <FormattedMessage id="dropdown.open.folder" />
            </DropdownMenu.Item>

            {onEdit && (
              <DropdownMenu.Item
                className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow-600 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white"
                onClick={onEdit}
              >
                <IoPencilSharp className="size-4" />
                <FormattedMessage id="dropdown.edit.keypath" />
              </DropdownMenu.Item>
            )}

            <DialogTrigger asChild>
              <DropdownMenu.Item className="group relative flex h-6 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-red-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-red-700 data-[highlighted]:font-bold data-[disabled]:text-zinc-500 data-[highlighted]:text-white">
                <IoTrash className="size-4" />
                <FormattedMessage id="dropdown.delete.keybind" />
              </DropdownMenu.Item>
            </DialogTrigger>

            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <ModalConfirmation
        titleID="modal.delete.keybind.title"
        descriptionID="modal.delete.keybind.description"
        onConfirm={onDelete}
        confirmButtonProps={{
          variant: 'destructive',
        }}
      />
    </Dialog>
  );
}
