import { HotkeysProvider } from 'react-hotkeys-hook';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './contexts/appContext';
import { useUpdater } from './hooks/useUpdater';
import { Home } from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  useUpdater();

  return (
    <>
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <HotkeysProvider>
        <AppProvider>
          <Home />
        </AppProvider>
      </HotkeysProvider>
    </>
  );
}
