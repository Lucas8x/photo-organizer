import { X } from 'lucide-react';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
import { useFiles, useSettings } from '@/store';
import { Input } from '@/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

export function ImageCountInput() {
  const intl = useIntl();
  const currentIndex = useFiles((s) => s.index);
  const files = useFiles((s) => s.files);
  const hideImageCount = useSettings((s) => s.hideImageCount);
  const setIndex = useFiles((s) => s.setIndex);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(currentIndex + (files.length > 0 ? 1 : 0));

  function handleKey(key: string) {
    if (key === 'Escape') {
      setIsOpen(false);
    }

    if (key === 'Enter') {
      setIsOpen(false);
      if (!value || value - 1 < 0 || value - 1 >= files.length) {
        toast.error(intl.formatMessage({ id: 'toast.invalid.index.input' }));
        return;
      }
      setIndex(value - 1);
    }
  }

  if (hideImageCount) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex cursor-pointer items-center gap-2'>
            <button
              className={cn('h-6', {
                hidden: !isOpen,
              })}
              onClick={() => setIsOpen(false)}
              type='button'
            >
              <X className='h-4 w-4 dark:text-zinc-400' />
            </button>

            <button
              className='flex items-center'
              onClick={() => setIsOpen(true)}
              type='button'
            >
              <Input
                className={cn('h-6', {
                  hidden: !isOpen,
                })}
                max={files.length}
                min='1'
                onChange={(e) => setValue(Number.parseInt(e.target.value, 10))}
                onKeyDown={(e) => handleKey(e.key)}
                placeholder={(
                  currentIndex + (files.length > 0 ? 1 : 0)
                ).toString()}
                type='number'
                value={value}
              />

              <span
                className={cn('font-bold dark:text-white', {
                  hidden: isOpen,
                })}
              >
                {currentIndex === undefined
                  ? '-'
                  : currentIndex + (files.length > 0 ? 1 : 0)}
              </span>

              <span className='font-bold dark:text-white'>/{files.length}</span>
            </button>
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <FormattedMessage id='image.count.tooltip' />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
