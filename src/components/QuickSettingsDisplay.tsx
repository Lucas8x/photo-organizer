import { useSettings } from '../store';
import { SwitchLabeled } from './SwitchLabeled';

export function QuickSettingsDisplay() {
  const isMovingFiles = useSettings((s) => s.isMovingFiles);
  const toggleIsMovingFiles = useSettings((s) => s.toggleIsMovingFiles);

  const nextImgAfterCopy = useSettings((s) => s.nextImgAfterCopy);
  const toggleNextImgAfterCopy = useSettings((s) => s.toggleNextImgAfterCopy);

  const showingFolderPreviews = useSettings((s) => s.showingFolderPreviews);
  const toggleShowingFolderPreviews = useSettings(
    (s) => s.toggleShowingFolderPreviews,
  );

  return (
    <div className="flex items-center justify-around">
      <SwitchLabeled
        text="Copy / Move"
        title="Switch between copy or move images"
        onChange={toggleIsMovingFiles}
        checked={isMovingFiles}
      />
      <SwitchLabeled
        text="Next image after Copy"
        title="Go to next image after press keybind"
        onChange={toggleNextImgAfterCopy}
        checked={nextImgAfterCopy}
      />
      <SwitchLabeled
        text="Folder Preview"
        title="Switch keybind folder preview"
        onChange={toggleShowingFolderPreviews}
        checked={showingFolderPreviews}
      />
    </div>
  );
}
