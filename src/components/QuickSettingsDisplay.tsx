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
        textID="quickSettings.copy_move"
        tooltipID="quickSettings.copy_move.description"
        onCheckedChange={toggleIsMovingFiles}
        checked={isMovingFiles}
      />
      <SwitchLabeled
        textID="quickSettings.next_img"
        tooltipID="quickSettings.next_img.description"
        onCheckedChange={toggleNextImgAfterCopy}
        checked={nextImgAfterCopy}
      />
      <SwitchLabeled
        textID="quickSettings.folder_preview"
        tooltipID="quickSettings.folder_preview.description"
        onCheckedChange={toggleShowingFolderPreviews}
        checked={showingFolderPreviews}
      />
    </div>
  );
}
