import { scan } from 'react-scan';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';

scan({
  enabled: process.env.NODE_ENV === 'development',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
