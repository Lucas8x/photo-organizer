import { useContext } from 'react';
import { AppContext } from '../contexts/appContext';

export function useApp() {
  const app = useContext(AppContext);
  return app;
}
