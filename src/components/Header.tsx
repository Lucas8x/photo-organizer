import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';
import { cn } from '@/lib/utils';
import { useFiles, useSettings } from '@/store';
import { Button } from '@/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import { InputPath } from './InputPath';
import { QuickSettingsDisplay } from './QuickSettingsDisplay';

export function Header() {
  const currentFolderPath = useFiles((s) => s.currentFolderPath);
  const changeFolder = useFiles((s) => s.changeFolder);

  const hideHeaderQuickSettings = useSettings((s) => s.hideHeaderQuickSettings);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <header className='flex w-full flex-col bg-white dark:bg-zinc-900'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                'flex h-4 justify-center border-b-neutral-300 outline-hidden dark:border-b-zinc-700 dark:text-white',
                {
                  'border-b': collapsed,
                }
              )}
              onClick={() => setCollapsed((s) => !s)}
              variant='ghost'
            >
              {collapsed ? <IoChevronUp /> : <IoChevronDown />}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <FormattedMessage
              id={collapsed ? 'header.expand' : 'header.collapse'}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={cn('flex flex-col gap-2 px-4 pt-1 pb-2', {
          hidden: collapsed,
          'pb-4': hideHeaderQuickSettings,
        })}
      >
        <span className='font-bold dark:text-white'>
          <FormattedMessage id='header.title' />
        </span>

        <InputPath
          onChange={changeFolder}
          onRefresh={() => changeFolder(currentFolderPath)}
          value={currentFolderPath}
        />

        {!hideHeaderQuickSettings && <QuickSettingsDisplay />}
      </div>
    </header>
  );
}
