import { dialog } from '@tauri-apps/api';
import { KeyboardEvent, useRef, useState } from 'react';
import { IoRefresh, IoFolderOutline } from 'react-icons/io5';

interface InputPathProps {
  value?: string;
  onChange: (path: string) => void;
  hideRefreshButton?: boolean;
}

export function InputPath({
  value,
  onChange,
  hideRefreshButton,
  ...props
}: InputPathProps) {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(value: string) {
    setInputValue(value);
    onChange(value);
  }

  async function openDialog() {
    const selected = await dialog.open({
      directory: true,
    });

    if (!selected || Array.isArray(selected)) return;

    setInputValue(selected);
    onChange(selected);
  }

  function clickPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == 'Enter') {
      inputRef?.current?.blur();
    }
  }

  function handleRefresh() {
    if (!inputValue) return;
    onChange(inputValue);
  }

  return (
    <div className="flex items-center gap-3">
      <input
        className="flex w-full rounded-md border border-solid border-neutral-400 px-3 py-2 outline-none"
        ref={inputRef}
        placeholder="Enter folder path"
        value={inputValue || value}
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

      {!hideRefreshButton && (
        <button
          className="text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!inputValue}
        >
          <IoRefresh
            className="size-6"
            onClick={handleRefresh}
            title="Refresh current folder"
          />
        </button>
      )}
    </div>
  );
}
