import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { convertFileSrc, invoke } from '@tauri-apps/api/core';
import { useMemo, useState } from 'react';
import { IoFolder, IoPencilSharp, IoTrash } from 'react-icons/io5';
import { LuImageOff } from 'react-icons/lu';
import { FormattedMessage } from 'react-intl';
import { ModalConfirmation } from '@/modals/ModalConfirmation';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { getPathBasename } from '../utils';

type Props = {
  keybind: string;
  onDelete: () => void;
  onEdit?: () => void;
  path: string;
  previewPath?: string;
  showPreview?: boolean;
};

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
    if (!showPreview) {
      return null;
    }
    setImgError(false);
    return previewPath && convertFileSrc(previewPath);
  }, [showPreview, previewPath]);

  async function handleOpenFolder() {
    if (!path) {
      return;
    }
    await invoke('show_in_folder', { path });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <button
                  aria-label='Keybind actions'
                  className='flex items-center gap-2 outline-hidden'
                  type='button'
                >
                  <div
                    className='flex size-11 items-center justify-center rounded-md bg-neutral-200 data-[hidden=true]:hidden dark:bg-zinc-700'
                    data-hidden={!showPreview}
                  >
                    {imgError || !url ? (
                      <LuImageOff className='size-6 dark:text-neutral-200' />
                    ) : (
                      // biome-ignore lint/a11y/noNoninteractiveElementInteractions: <ok>
                      <img
                        alt=''
                        className='size-11 rounded-md'
                        height={44}
                        onError={() => setImgError(true)}
                        src={url}
                        width={44}
                      />
                    )}
                  </div>

                  <div className='flex flex-col justify-center text-start'>
                    <span className='dark:text-white'>
                      <FormattedMessage id='keybind' />:{' '}
                      <b className='uppercase'>{keybind}</b>
                    </span>

                    <span className='w-min dark:text-white'>
                      {getPathBasename(path).split('\\').slice(-2).join('/')}
                    </span>
                  </div>
                </button>
              </TooltipTrigger>
            </DropdownMenuTrigger>

            <TooltipContent>
              <FormattedMessage id='keybind.title' />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuPortal>
          <DropdownMenuContent
            className='data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade flex min-w-60 flex-col gap-1 rounded-md bg-white px-1 py-2 shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] will-change-[opacity,transform]'
            side='top'
            sideOffset={5}
          >
            <DropdownMenuItem
              className='group relative flex h-6 cursor-pointer items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-hidden select-none data-disabled:pointer-events-none data-disabled:text-zinc-500 data-highlighted:bg-green-600 data-highlighted:font-bold data-highlighted:text-white'
              onClick={handleOpenFolder}
            >
              <IoFolder className='size-4' />
              <FormattedMessage id='dropdown.open.folder' />
            </DropdownMenuItem>

            {!!onEdit && (
              <DropdownMenuItem
                className='group relative flex h-6 cursor-pointer items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-black outline-hidden select-none data-disabled:pointer-events-none data-disabled:text-zinc-500 data-highlighted:bg-yellow-600 data-highlighted:font-bold data-highlighted:text-white'
                onClick={onEdit}
              >
                <IoPencilSharp className='size-4' />
                <FormattedMessage id='dropdown.edit.keypath' />
              </DropdownMenuItem>
            )}

            <DialogTrigger asChild>
              <DropdownMenuItem className='group relative flex h-6 cursor-pointer items-center gap-2 rounded-md px-4 py-4 text-sm leading-none text-red-600 outline-hidden select-none data-disabled:pointer-events-none data-disabled:text-zinc-500 data-highlighted:bg-red-700 data-highlighted:font-bold data-highlighted:text-white'>
                <IoTrash className='size-4' />
                <FormattedMessage id='dropdown.delete.keybind' />
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuArrow className='fill-white' />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <ModalConfirmation
        confirmButtonProps={{
          variant: 'destructive',
        }}
        descriptionID='modal.delete.keybind.description'
        onConfirm={onDelete}
        titleID='modal.delete.keybind.title'
      />
    </Dialog>
  );
}
