import { HotkeysProvider } from 'react-hotkeys-hook';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './contexts/appContext';
import { Home } from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
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
