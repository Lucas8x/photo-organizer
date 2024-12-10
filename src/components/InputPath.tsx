import * as dialog from '@tauri-apps/plugin-dialog';
import { KeyboardEvent, useRef } from 'react';
import { IoRefresh, IoFolderOutline } from 'react-icons/io5';

interface InputPathProps {
  value?: string;
  onChange: (path: string) => void;
  onRefresh?: () => void;
  hideRefreshButton?: boolean;
}

export function InputPath({
  value,
  onChange,
  onRefresh,
  hideRefreshButton,
  ...props
}: InputPathProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(value: string) {
    onChange(value);
  }

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
    <div className="flex items-center gap-3">
      <input
        className="flex w-full rounded-md border border-solid border-neutral-400 px-3 py-2 outline-none"
        ref={inputRef}
        placeholder="Enter folder path"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyPress={clickPress}
        id="joyride-input"
        {...props}
      />

      <button onClick={openDialog}>
        <IoFolderOutline
          className="size-6 text-white"
          title="Open system folder selection dialog"
        />
      </button>

      <button
        className="text-white disabled:cursor-not-allowed disabled:opacity-50 data-[hidden]:hidden"
        disabled={!value}
        data-hidden={hideRefreshButton}
      >
        <IoRefresh
          className="size-6"
          onClick={onRefresh}
          title="Refresh current folder"
        />
      </button>
    </div>
  );
}
