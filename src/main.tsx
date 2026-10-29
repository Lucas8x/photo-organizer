import React from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan';
import App from './App';
import './styles/styles.css';

scan({
  enabled: process.env.NODE_ENV === 'development',
});

createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
