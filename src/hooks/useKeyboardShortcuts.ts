import { useFiles, useModal } from '@/store';
import { useHotkeys } from 'react-hotkeys-hook';
import { undo } from '@/functions/undo';

export function useKeyboardShortcuts() {
  const blockHotkeys = useModal((s) => s.blockHotkeys);
  const decreaseIndex = useFiles((s) => s.decreaseIndex);
  const increaseIndex = useFiles((s) => s.increaseIndex);

  useHotkeys(
    'ArrowLeft',
    decreaseIndex,
    {
      enabled: !blockHotkeys,
    },
    [],
  );

  useHotkeys(
    'ArrowRight',
    increaseIndex,
    {
      enabled: !blockHotkeys,
    },
    [],
  );

  useHotkeys(
    'ctrl+z',
    undo,
    {
      enabled: !blockHotkeys,
    },
    [],
  );
}
