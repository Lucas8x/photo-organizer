import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useShallow } from 'zustand/react/shallow';
import { ModalAddKeybind } from '../modals/ModalAddKeybind';
import { useJoyride, useKeybinds, useSettings } from '../store';
import { Button } from '../ui/button';
import { KeybindPreview } from './KeybindPreview';
import { cn } from '@/lib/utils';

export function KeybindsDisplay() {
  const keybinds = useKeybinds(useShallow((s) => Object.entries(s.keybinds)));
  const deleteKeybind = useKeybinds((s) => s.deleteKeybind);

  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);

  const showingFolderPreviews = useSettings((s) => s.showingFolderPreviews);

  const [editKeybind, setEditKeybind] = useState<{
    key: string;
    path: string;
  }>();

  const hasKeys = keybinds.length > 0;

  return (
    <>
      <div
        className="flex w-full flex-col items-center gap-3 bg-white py-2 dark:bg-zinc-900"
        id="joyride-keybinds"
      >
        <div
          className={cn('flex flex-wrap justify-center gap-x-5 gap-y-3', {
            hidden: !hasKeys && !isJoyrideRunning,
          })}
        >
          {keybinds.map(([key, { path, previewPath }]) => (
            <KeybindPreview
              key={`${key}-${path}-${previewPath}`}
              keybind={key}
              path={path}
              previewPath={previewPath}
              showPreview={showingFolderPreviews}
              onEdit={() => setEditKeybind({ key, path })}
              onDelete={() => deleteKeybind(key)}
            />
          ))}

          <div
            id="joyride-example-keybind"
            className={cn({
              hidden: !isJoyrideRunning,
            })}
          >
            <KeybindPreview
              keybind="A"
              path="C:\photos\Family"
              previewPath=""
              showPreview
              onDelete={() => null}
            />
          </div>
        </div>

        <span
          className={cn('font-bold dark:text-white', {
            hidden: hasKeys || isJoyrideRunning,
          })}
        >
          <FormattedMessage id="keybind.not.defined" />
        </span>

        <Button onClick={() => setEditKeybind({ key: '', path: '' })}>
          <FormattedMessage id="keybind.add" />
        </Button>
      </div>

      {editKeybind && (
        <ModalAddKeybind
          initialKeybind={editKeybind.key}
          initialOutputPath={editKeybind.path}
          close={() => {
            setEditKeybind(undefined);
          }}
        />
      )}
    </>
  );
}
