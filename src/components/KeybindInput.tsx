import { useMemo, useRef } from 'react';
import { useRecordHotkeys } from 'react-hotkeys-hook';
import { IoRefresh } from 'react-icons/io5';
import { RESERVED_KEYS } from '@/constants';
import { cn } from '@/lib/utils';
import { useKeybinds } from '@/store';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';

export function KeybindInput(props: {
  autoFocus?: boolean;
  className?: string;
  focusOnReset?: boolean;
  hideResetButton?: boolean;
  onChange: (keys: string) => void;
  onReset: () => void;
  placeholder?: string;
  resetPosition?: 'left' | 'right';
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  /* const folderKeys = useKeybinds((s) => s.keybinds);
  const disallowedKeys = useMemo(
    () => Object.keys(folderKeys).concat(RESERVED_KEYS),
    []
  ); */

  const [keys, { start, stop, resetKeys }] = useRecordHotkeys(false, [
    ...RESERVED_KEYS,
  ]);
  const stringfiedKeys = Array.from(keys).join('+');

  /* function handleKeyDown(key: string) {
    if (RESERVED_KEYS.includes(key as (typeof RESERVED_KEYS)[number])) {
      toast.error(intl.formatMessage({ id: 'modal.create.keybind.reserved' }));
      return;
    }
  } */

  return (
    <div
      className={cn(
        'flex gap-3',
        {
          'flex-row-reverse': props.resetPosition === 'right',
        },
        props.className
      )}
      id='keybind-input'
    >
      {!props.hideResetButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className='aspect-square'
                onClick={() => {
                  resetKeys();
                  props.onReset();
                  if (props.focusOnReset) {
                    inputRef.current?.focus();
                  }
                }}
                size='icon'
                variant='outline'
              >
                <IoRefresh />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Reset</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Input
        autoFocus={props.autoFocus}
        onBlur={() => {
          stop();
          if (keys.size) {
            props.onChange(stringfiedKeys);
          }
        }}
        onFocus={start}
        readOnly
        ref={inputRef}
        required
        value={keys.size > 0 ? stringfiedKeys : props.value}
      />
    </div>
  );
}
