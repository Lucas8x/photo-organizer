import { ChangeEvent, useRef, KeyboardEvent, useState } from 'react';
import { useBridge } from '../../hooks';
import { Container, Input, FolderIcon } from './styles';

interface Props {
  onChange: (path: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function InputPath({ onChange, onFocus, onBlur }: Props) {
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

  return (
    <Container>
      <Input
        ref={inputRef}
        placeholder='Folder path'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={clickPress}
      />
      <FolderIcon onClick={openDialog} />
    </Container>
  );
}
