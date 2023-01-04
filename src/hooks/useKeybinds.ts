import { useContext } from 'react';
import { KeybindsContext } from '../contexts/keybindsContext';

export function useKeybinds() {
  const keybind = useContext(KeybindsContext);
  return keybind;
}
