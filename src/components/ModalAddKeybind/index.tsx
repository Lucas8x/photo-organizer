import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';

import { RESERVED_KEYS } from '../../constants';
import { useKeybinds, useScrollBlock } from '../../hooks';

import { ModalBase } from '../ModalBase';
import { InputPath } from '../InputPath';

import {
  Container,
  KeybindContainer,
  CurrentKeybind,
  InputPathContainer,
  Text,
  ButtonsContainer,
  ConfirmButton,
  CloseButton,
} from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddKeybind({ isOpen, onClose }: Props) {
  useScrollBlock(true);
  const { addKeybind } = useKeybinds();
  const [keybind, setKeybind] = useState('');
  const [outputFolder, setOutputFolder] = useState('');

  useHotkeys(
    '*',
    (e) => {
      if (RESERVED_KEYS.includes(e.key)) {
        toast.error('This key is reserved.');
        return;
      }
      setKeybind(e.key);
    },
    {
      scopes: 'ModalAddKeybind',
      enabled: isOpen,
    },
    [isOpen]
  );

  function handleConfirm() {
    addKeybind({
      key: keybind,
      path: outputFolder,
    }) && onClose();
  }

  return (
    <ModalBase>
      <Container>
        <KeybindContainer>
          <Text>Please press any key</Text>
          {keybind && (
            <CurrentKeybind>
              You pressed: <b>{keybind.toLocaleUpperCase()}</b>
            </CurrentKeybind>
          )}
        </KeybindContainer>

        <InputPathContainer>
          <Text>Please enter destination folder path:</Text>
          <InputPath onChange={setOutputFolder} hideRefreshButton />
        </InputPathContainer>

        <ButtonsContainer>
          <ConfirmButton
            onClick={handleConfirm}
            disabled={!keybind || !outputFolder}
          >
            Confirm
          </ConfirmButton>

          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonsContainer>
      </Container>
    </ModalBase>
  );
}
