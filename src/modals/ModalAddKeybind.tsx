import { useState } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { InputPath } from '../components/InputPath';
import { RESERVED_KEYS } from '../constants';
import { useKeybinds } from '../store';
import { Button } from '../ui/button';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';

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

  function handleKeyDown(key: string) {
    if (RESERVED_KEYS.includes(key as (typeof RESERVED_KEYS)[number])) {
      toast.error(intl.formatMessage({ id: 'modal.create.keybind.reserved' }));
      return;
    }
    setKeybind(key);
  }

  async function handleConfirm() {
    if (initialKeybind || initialOutputPath) {
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
        }),
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
      }),
    );

    if (success) {
      close();
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage id="modal.create.keybind.title" />
          </DialogTitle>
          <DialogDescription>
            <FormattedMessage id="modal.create.keybind.description" />
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keybind" className="text-right">
              <FormattedMessage id="modal.create.input.keybind.label" />
            </Label>
            <Input
              className="col-span-3"
              id="keybind"
              value={keybind}
              onKeyDown={({ key }) => handleKeyDown(key)}
              placeholder={intl.formatMessage({
                id: 'modal.create.keybind.placeholder',
              })}
              readOnly
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="folder-path-input" className="text-right">
              <FormattedMessage id="modal.create.input.path.label" />
            </Label>
            <InputPath
              className="col-span-3"
              value={outputPath}
              onChange={setOutputPath}
              hideRefreshButton
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={close}>
              <FormattedMessage id="modal.close" />
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleConfirm}
              disabled={!keybind || !outputPath}
            >
              <FormattedMessage id="modal.confirm" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
