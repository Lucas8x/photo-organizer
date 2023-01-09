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
        title='Copy / Move'
        onChange={switchCopyOrMove}
        checked={isMovingFiles}
      />
      <SwitchLabeled
        title='Folder Preview'
        onChange={switchFolderPreview}
        checked={showingFolderPreviews}
      />
      <SwitchLabeled
        title='Next image after Copy'
        onChange={switchNextImageAfterCopy}
        checked={nextImgAfterCopy}
      />
    </Container>
  );
}
