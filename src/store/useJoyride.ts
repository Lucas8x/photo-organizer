import { create } from 'zustand';

type JoyrideState = {
  isJoyrideRunning: boolean;
  setIsJoyrideRunning: (b: boolean) => void;
};

export const useJoyride = create<JoyrideState>((set) => ({
  isJoyrideRunning: false,
  setIsJoyrideRunning: (b) => set(() => ({ isJoyrideRunning: b })),
}));
