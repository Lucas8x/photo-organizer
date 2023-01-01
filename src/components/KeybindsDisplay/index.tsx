import { useContext } from 'react';
import { AppContext } from '../../contexts/appContext';

import { KeybindsContext } from '../../contexts/keybindsContext';
import { KeybindPreview } from '../KeybindPreview';

import { Container, KeybindsContainer, Message, AddButton } from './styles';

interface Props {
  onOpenModal: () => void;
}

export function KeybindsDisplay({ onOpenModal }: Props) {
  const { keybinds } = useContext(KeybindsContext);
  //const { showingFolderPreviews } = useContext(AppContext);

  const keybindsArr = Object.entries(keybinds);

  return (
    <>
      <Container>
        {keybindsArr.length > 0 ? (
          <KeybindsContainer>
            {keybindsArr.map((k, index) => (
              <KeybindPreview
                key={`${index}-keybind`}
                keybind={k[0]}
                path={k[1]}
              />
            ))}
          </KeybindsContainer>
        ) : (
          <Message>Please register keybinds</Message>
        )}

        <AddButton onClick={onOpenModal}>Create keybind</AddButton>
      </Container>
    </>
  );
}
