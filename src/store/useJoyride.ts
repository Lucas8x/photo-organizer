import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type JoyrideState = {
  isJoyrideRunning: boolean;
  setIsJoyrideRunning: (b: boolean) => void;
};

export const useJoyride = create<JoyrideState>()(
  persist(
    (set) => ({
      isJoyrideRunning: true,
      setIsJoyrideRunning: (b) => set(() => ({ isJoyrideRunning: b })),
    }),
    {
      name: 'joyride',
      storage: createJSONStorage(() => localStorage),
      //skipHydration: true,
    }
  )
);
