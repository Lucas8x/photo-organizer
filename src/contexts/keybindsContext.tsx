import { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

interface KeybindsContextProps {
  children: ReactNode;
}

interface KeybindsContextData {
  keybinds: IKeybinds;
  addKeybind: (data: IKeybind) => boolean;
  deleteKeybind: (key: string) => void;
}

export const KeybindsContext = createContext({} as KeybindsContextData);

export function KeybindsProvider({ children }: KeybindsContextProps) {
  const [keybinds, setKeybinds] = useState<IKeybinds>({});

  function addKeybind({ key, path }: IKeybind) {
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
  }

  function deleteKeybind(key: string) {
    setKeybinds((s) => {
      delete s[key];
      return s;
    });
  }

  return (
    <KeybindsContext.Provider
      value={{
        keybinds,
        addKeybind,
        deleteKeybind,
      }}
    >
      {children}
    </KeybindsContext.Provider>
  );
}
