import { useMemo } from 'react';

import { KeybindPreview } from '../KeybindPreview';

import { useApp, useKeybinds } from '../../hooks';

import { Container, KeybindsContainer, Message, AddButton } from './styles';

interface Props {
  onOpenModal: () => void;
}

export function KeybindsDisplay({ onOpenModal }: Props) {
  const { keybinds, clearAll } = useKeybinds();
  const { showingFolderPreviews } = useApp();

  const keybindsArr = useMemo(() => Object.entries(keybinds), [keybinds]);

  return (
    <Container>
      {keybindsArr.length > 0 ? (
        <KeybindsContainer>
          {keybindsArr.map((k, index) => (
            <KeybindPreview
              key={`${index}-keybind`}
              keybind={k[0]}
              path={k[1]}
              showPreview={showingFolderPreviews}
              //previewPath={''}
            />
          ))}
        </KeybindsContainer>
      ) : (
        <Message>Please register keybinds</Message>
      )}

      <AddButton onClick={onOpenModal}>Create keybind</AddButton>
    </Container>
  );
}
