import { useHotkeys } from 'react-hotkeys-hook';
import { undo } from '@/functions/undo';
import { useAppControls, useFiles } from '@/store';

export function useKeyboardShortcuts() {
  const decreaseIndex = useFiles((s) => s.decreaseIndex);
  const increaseIndex = useFiles((s) => s.increaseIndex);
  const actionToKeybind = useAppControls((s) => s.actionsToKeybinds);

  useHotkeys(
    actionToKeybind['previous.image'],
    decreaseIndex,
    { scopes: 'editor', description: 'Move to the previous image.' },
    [actionToKeybind['previous.image'], decreaseIndex]
  );

  useHotkeys(
    actionToKeybind['next.image'],
    increaseIndex,
    { scopes: 'editor', description: 'Move to the next image.' },
    [actionToKeybind['next.image'], increaseIndex]
  );

  useHotkeys(
    actionToKeybind.undo,
    undo,
    {
      scopes: 'editor',
      description: 'Undo last action (move or copy)',
      preventDefault: true,
    },
    [actionToKeybind.undo]
  );
}
