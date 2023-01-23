import { ToastContainer } from 'react-toastify';
import { HotkeysProvider } from 'react-hotkeys-hook';
import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './contexts/appContext';
import { KeybindsProvider } from './contexts/keybindsContext';
import { Home } from './pages/Home';
import { AppJoyride } from './components/AppJoyride';

import { GlobalStyle } from './styles/GlobalStyle';

export function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <HotkeysProvider>
        <KeybindsProvider>
          <AppProvider>
            <Home />
          </AppProvider>
        </KeybindsProvider>
      </HotkeysProvider>

      {/* <AppJoyride /> */}
    </>
  );
}
