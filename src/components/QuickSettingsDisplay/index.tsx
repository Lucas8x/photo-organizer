import { useApp } from '../../hooks';
import { SwitchLabeled } from '../SwitchLabeled';
import { Container } from './styles';

export function QuickSettingsDisplay() {
  const {
    isMovingFiles,
    switchCopyOrMove,
    showingFolderPreviews,
    switchFolderPreview,
    nextImgAfterCopy,
    switchNextImageAfterCopy,
  } = useApp();

  return (
    <Container>
      <SwitchLabeled
        text='Copy / Move'
        title='Switch between copy or move images'
        onChange={switchCopyOrMove}
        checked={isMovingFiles}
      />
      <SwitchLabeled
        text='Folder Preview'
        title='Switch keybind folder preview'
        onChange={switchFolderPreview}
        checked={showingFolderPreviews}
      />
      <SwitchLabeled
        text='Next image after Copy'
        title='Go to next image after press keybind'
        onChange={switchNextImageAfterCopy}
        checked={nextImgAfterCopy}
      />
    </Container>
  );
}
