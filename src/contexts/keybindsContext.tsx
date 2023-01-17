import { createContext, ReactNode, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface KeybindsContextProps {
  children: ReactNode;
}

interface KeybindsContextData {
  keybinds: IKeybinds;
  addKeybind: (data: IKeybind) => boolean;
  deleteKeybind: (key: string) => void;
  clearAll: () => void;
}

export const KeybindsContext = createContext({} as KeybindsContextData);

export function KeybindsProvider({ children }: KeybindsContextProps) {
  const [keybinds, setKeybinds] = useState<IKeybinds>({});

  const addKeybind = useCallback(
    ({ key, path }: IKeybind) => {
      if (keybinds[key]) {
        toast.error('This keybind already exist.');
        return false;
      }

      setKeybinds((s) => ({
        ...s,
        [key]: path,
      }));
      toast.success('Keybind registered.');

      return true;
    },
    [keybinds]
  );

  function deleteKeybind(key: string) {
    setKeybinds((s) => {
      delete s[key];
      return s;
    });
  }

  function clearAll() {
    setKeybinds({});
  }

  return (
    <KeybindsContext.Provider
      value={{
        keybinds,
        addKeybind,
        deleteKeybind,
        clearAll,
      }}
    >
      {children}
    </KeybindsContext.Provider>
  );
}
