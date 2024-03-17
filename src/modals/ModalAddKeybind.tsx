import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';
import { InputPath } from '../components/InputPath';
import { RESERVED_KEYS } from '../constants';
import { useKeybinds } from '../store';
import { Button } from '../ui/Button';
import { ModalBase } from './ModalBase';

interface Props {
  close: () => void;
  initialKeybind?: string;
  initialOutputPath?: string;
}

export function ModalAddKeybind({
  close,
  initialKeybind = '',
  initialOutputPath = '',
}: Props) {
  const { addKeybind } = useKeybinds();

  const [keybind, setKeybind] = useState(initialKeybind);
  const [outputPath, setOutputPath] = useState(initialOutputPath);

  useHotkeys(
    '*',
    (e) => {
      if (RESERVED_KEYS.includes(e.key)) {
        toast.error('This key is reserved.');
        return;
      }
      setKeybind(e.key);
    },
    {
      scopes: 'ModalAddKeybind',
      enabled: true,
    },
    [],
  );

  async function handleConfirm() {
    const success = await addKeybind({
      key: keybind,
      path: outputPath,
    });

    if (success) {
      close();
    }
  }

  return (
    <ModalBase>
      <div className="flex w-full max-w-[500px] flex-col items-center gap-5 rounded-xl bg-neutral-800 p-5">
        <div className="flex flex-col gap-1 text-center">
          <span className="font-bold text-white">Please press any key</span>

          {keybind && (
            <>
              <span className="text-white">You pressed:</span>
              <span className="self-center rounded border border-solid border-zinc-400 bg-zinc-100 px-1 py-[2px] text-xl font-bold text-zinc-800">
                {keybind.toLocaleUpperCase()}
              </span>
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2 text-center">
          <span className="font-bold text-white">
            Please enter destination folder path:
          </span>

          <InputPath
            value={outputPath}
            onChange={setOutputPath}
            hideRefreshButton
          />
        </div>

        <div className="flex gap-8">
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!keybind || !outputPath}
          >
            Confirm
          </Button>

          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
