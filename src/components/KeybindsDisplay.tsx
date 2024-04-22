import { useState } from 'react';
import { ModalAddKeybind } from '../modals/ModalAddKeybind';
import { useKeybinds, useModal, useSettings } from '../store';
import { Button } from '../ui/Button';
import { KeybindPreview } from './KeybindPreview';

export function KeybindsDisplay() {
  const { isModalKeybindOpen, setIsModalKeybindOpen } = useModal();
  const { keybinds, deleteKeybind, clearAll } = useKeybinds();
  const { showingFolderPreviews } = useSettings();

  const [editKeybind, setEditKeybind] = useState<{
    key: string;
    path: string;
  }>();

  const keybindsArr = Object.entries(keybinds);
  const hasKeys = keybindsArr.length > 0;

  return (
    <>
      <div
        className="flex w-full flex-col items-center gap-3 bg-zinc-900 py-4"
        id="joyride-keybinds"
      >
        {hasKeys ? (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {keybindsArr.map(([key, { path, previewPath }]) => (
              <KeybindPreview
                key={key}
                keybind={key}
                path={path}
                previewPath={previewPath}
                showPreview={showingFolderPreviews}
                /* onEdit={() => {
                  setEditKeybind({ key, path });
                  setIsModalKeybindOpen(true);
                }} */
                onDelete={() => deleteKeybind(key)}
              />
            ))}
          </div>
        ) : (
          <span className="font-bold text-white">Please register keybinds</span>
        )}

        <Button variant="primary" onClick={() => setIsModalKeybindOpen(true)}>
          Create keybind
        </Button>
      </div>

      {isModalKeybindOpen && (
        <ModalAddKeybind
          initialKeybind={editKeybind?.key}
          initialOutputPath={editKeybind?.path}
          close={() => {
            setIsModalKeybindOpen(false);
            setEditKeybind(undefined);
          }}
        />
      )}
    </>
  );
}
