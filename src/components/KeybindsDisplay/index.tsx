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
  const hasKeys = useMemo(() => keybindsArr.length > 0, [keybindsArr.length]);

  return (
    <Container>
      {hasKeys ? (
        <KeybindsContainer>
          {keybindsArr.map((k, index) => (
            <KeybindPreview
              key={`${index}-keybind`}
              keybind={k[0]}
              path={k[1].path}
              previewPath={k[1].previewPath}
              showPreview={showingFolderPreviews}
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
