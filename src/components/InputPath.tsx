import * as dialog from '@tauri-apps/plugin-dialog';
import React, { KeyboardEvent, useRef } from 'react';
import { IoRefresh, IoFolderOutline } from 'react-icons/io5';
import { FormattedMessage, useIntl } from 'react-intl';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { cn } from '@/lib/utils';

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
    const selected = await dialog.open({
      directory: true,
    });

    if (!selected || Array.isArray(selected)) return;

    onChange(selected);
  }

  function clickPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      inputRef?.current?.blur();
    }
  }

  return (
    <div
      className={cn('flex w-full items-center gap-3', className)}
      id="joyride-folder-input"
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={intl.formatMessage({ id: 'folder.input.placeholder' })}
        required
        onKeyPress={clickPress}
        {...props}
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={openDialog}
              className="aspect-square"
            >
              <IoFolderOutline className="size-6 dark:text-white" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <FormattedMessage id="folder.input.folder.dialog" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {!hideRefreshButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onRefresh}
                className="aspect-square"
                disabled={!value}
              >
                <IoRefresh className="size-6" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <FormattedMessage id="folder.input.refresh" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
