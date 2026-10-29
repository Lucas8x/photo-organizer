import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useUpdater } from './hooks';
import { LOCALES } from './locales';
import { messages } from './locales/messages';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { TestPage } from './pages/Test';
import { useFiles, useSettings } from './store';
import { hookWebviewLog } from './utils/hookWebviewLog';

import 'react-toastify/dist/ReactToastify.css';

if (import.meta.env.MODE === 'development') {
  hookWebviewLog();
}

const currentWindow = getCurrentWindow();
let isFullscreen = false;

document.addEventListener('keydown', async (e) => {
  if (e.key === 'F11') {
    e.preventDefault();
    await currentWindow.setFullscreen(!isFullscreen);
    isFullscreen = !isFullscreen;
  }
});

export default function App() {
  const language = useSettings((s) => s.language);

  useEffect(() => {
    useFiles.getState().loadLatestFolder();
  }, []);

  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme='colored'
      />

      <IntlProvider
        defaultLocale={LOCALES.ENGLISH}
        locale={language}
        messages={messages[language] as Record<string, string>}
      >
        <Main />
      </IntlProvider>
    </>
  );
}

function Main() {
  useUpdater();

  return (
    <HotkeysProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Settings />} path='/settings' />
          <Route element={<TestPage />} path='/test' />
        </Routes>
      </BrowserRouter>
    </HotkeysProvider>
  );
}
