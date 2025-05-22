import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router';
import { getCurrentWindow } from '@tauri-apps/api/window';

import { useFiles, useSettings } from './store';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { TestPage } from './pages/Test';
import { LOCALES } from './locales';
import { messages } from './locales/messages';
import { hookWebviewLog } from './utils/hookWebviewLog';
import { useUpdater } from './hooks';

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
        theme="colored"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <IntlProvider
        messages={messages[language]}
        locale={language}
        defaultLocale={LOCALES.ENGLISH}
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
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </HotkeysProvider>
  );
}
