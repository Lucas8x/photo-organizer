import { ChangeEvent, useRef, KeyboardEvent, useState } from 'react';
import { useBridge } from '../../hooks';
import { Container, Input, FolderIcon, RefreshIcon } from './styles';

interface Props {
  onChange: (path: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hideRefreshButton?: boolean;
}

export function InputPath({
  onChange,
  onFocus,
  onBlur,
  hideRefreshButton,
  ...rest
}: Props) {
  const { openFolderDialog } = useBridge();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    setInputValue(value);
    onChange(value);
  }

  async function openDialog() {
    const { canceled, filePaths } = await openFolderDialog();
    if (canceled) return;
    setInputValue(filePaths[0]);
    onChange(filePaths[0]);
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
    <Container {...rest}>
      <Input
        ref={inputRef}
        placeholder='Folder path'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={clickPress}
      />

      <FolderIcon
        onClick={openDialog}
        title='Open system folder selection dialog'
      />

      {!hideRefreshButton && (
        <RefreshIcon
          onClick={handleRefresh}
          disabled={!inputValue}
          title='Refresh current folder'
        />
      )}
    </Container>
  );
}
