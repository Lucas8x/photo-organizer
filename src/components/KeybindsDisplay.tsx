import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ModalAddKeybind } from '../modals/ModalAddKeybind';
import { useJoyride, useKeybinds, useSettings } from '../store';
import { KeybindPreview } from './KeybindPreview';

export function KeybindsDisplay() {
  const keybinds = useKeybinds((s) => s.keybinds);
  const deleteKeybind = useKeybinds((s) => s.deleteKeybind);

  const isJoyrideRunning = useJoyride((s) => s.isJoyrideRunning);

  const showingFolderPreviews = useSettings((s) => s.showingFolderPreviews);

  const [editKeybind, setEditKeybind] = useState<{
    key: string;
    path: string;
  }>();

  const keybindsArr = Object.entries(keybinds);
  const hasKeys = keybindsArr.length > 0;

  return (
    <>
      <div
        className='flex w-full flex-col items-center gap-3 bg-white py-2 dark:bg-zinc-900'
        id='joyride-keybinds'
      >
        <div
          className={cn('flex flex-wrap justify-center gap-x-5 gap-y-3', {
            hidden: !(hasKeys || isJoyrideRunning),
          })}
        >
          {keybindsArr.map(([key, { path, previewPath }]) => (
            <KeybindPreview
              key={`${key}-${path}-${previewPath}`}
              keybind={key}
              onDelete={() => deleteKeybind(key)}
              onEdit={() => setEditKeybind({ key, path })}
              path={path}
              previewPath={previewPath}
              showPreview={showingFolderPreviews}
            />
          ))}

          <div
            className={cn({ hidden: !isJoyrideRunning })}
            id='joyride-example-keybind'
          >
            <KeybindPreview
              keybind='A'
              onDelete={() => null}
              path='C:\photos\Family'
              previewPath=''
              showPreview
            />
          </div>
        </div>

        <span
          className={cn('font-bold dark:text-white', {
            hidden: hasKeys || isJoyrideRunning,
          })}
        >
          <FormattedMessage id='keybind.not.defined' />
        </span>

        <Button onClick={() => setEditKeybind({ key: '', path: '' })}>
          <FormattedMessage id='keybind.add' />
        </Button>
      </div>

      {editKeybind && (
        <ModalAddKeybind
          close={() => {
            setEditKeybind(undefined);
          }}
          initialKeybind={editKeybind.key}
          initialOutputPath={editKeybind.path}
        />
      )}
    </>
  );
}
