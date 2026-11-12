import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { KeybindInput } from '@/components/KeybindInput';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Label } from '@/ui/label';
import { InputPath } from '../components/InputPath';
import { useKeybinds } from '../store';

type ModalAddKeybindProps = {
  initialKeybind?: string;
  initialOutputPath?: string;
  close: () => void;
};

export function ModalAddKeybind({
  initialKeybind = '',
  initialOutputPath = '',
  close,
}: ModalAddKeybindProps) {
  const intl = useIntl();

  const addKeybind = useKeybinds((s) => s.addKeybind);
  const updateKeybind = useKeybinds((s) => s.updateKeybind);

  const [keybind, setKeybind] = useState(initialKeybind);
  const [outputPath, setOutputPath] = useState(initialOutputPath);

  async function handleConfirm() {
    const isUpdatingKey = initialKeybind || initialOutputPath;

    if (isUpdatingKey) {
      const success = await updateKeybind({
        previousKey: initialKeybind,
        newKey: keybind,
        path: outputPath,
      });

      toast.success(
        intl.formatMessage({
          id: success
            ? 'store.keybinds.edit.success'
            : 'store.keybinds.edit.old.error',
        })
      );

      if (success) {
        close();
      }

      return;
    }

    const success = await addKeybind({
      key: keybind,
      path: outputPath,
    });

    toast.success(
      intl.formatMessage({
        id: success
          ? 'store.keybinds.create.success'
          : 'store.keybinds.create.exist.error',
      })
    );

    if (success) {
      close();
    }
  }

  return (
    <Dialog onOpenChange={(open) => !open && close()} open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage id='modal.create.keybind.title' />
          </DialogTitle>
          <DialogDescription>
            <FormattedMessage id='modal.create.keybind.description' />
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right' htmlFor='keybind-input'>
              <FormattedMessage id='modal.create.input.keybind.label' />
            </Label>
            <KeybindInput
              autoFocus
              className='col-span-3'
              focusOnReset
              onChange={(keys) => setKeybind(keys)}
              onReset={() => setKeybind('')}
              placeholder={intl.formatMessage({
                id: 'modal.create.keybind.placeholder',
              })}
              resetPosition='right'
              value={keybind}
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right' htmlFor='folder-path-input'>
              <FormattedMessage id='modal.create.input.path.label' />
            </Label>
            <InputPath
              autoComplete='off'
              className='col-span-3'
              hideRefreshButton
              onChange={setOutputPath}
              value={outputPath}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={close} variant='outline'>
              <FormattedMessage id='modal.close' />
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              disabled={!(keybind && outputPath)}
              onClick={handleConfirm}
              type='submit'
            >
              <FormattedMessage id='modal.confirm' />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
