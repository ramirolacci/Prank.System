import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';
import { LocalStorageProvider } from './context/LocalStorageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
