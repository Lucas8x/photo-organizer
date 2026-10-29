import { open } from '@tauri-apps/plugin-dialog';
import type React from 'react';
import { type KeyboardEvent, useRef } from 'react';
import { IoFolderOutline, IoRefresh } from 'react-icons/io5';
import { FormattedMessage, useIntl } from 'react-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

type InputPathProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  value?: string;
  onChange: (path: string) => void;
  onRefresh?: () => void;
  hideRefreshButton?: boolean;
  className?: string;
};

export function InputPath({
  value,
  onChange,
  onRefresh,
  hideRefreshButton,
  className,
  ...props
}: InputPathProps) {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);

  async function openDialog() {
    const selected = await open({
      directory: true,
    });

    if (!selected || Array.isArray(selected)) {
      return;
    }

    onChange(selected);
  }

  function clickPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
    }
  }

  return (
    <div
      className={cn('flex w-full items-center gap-3', className)}
      id='joyride-folder-input'
    >
      <Input
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={clickPress}
        placeholder={intl.formatMessage({ id: 'folder.input.placeholder' })}
        ref={inputRef}
        required
        value={value}
        {...props}
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className='aspect-square'
              onClick={openDialog}
              size='icon'
              variant='outline'
            >
              <IoFolderOutline className='size-6 dark:text-white' />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <FormattedMessage id='folder.input.folder.dialog' />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {!hideRefreshButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='aspect-square'
                disabled={!value}
                onClick={onRefresh}
                size='icon'
                variant='outline'
              >
                <IoRefresh className='size-6' />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <FormattedMessage id='folder.input.refresh' />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
