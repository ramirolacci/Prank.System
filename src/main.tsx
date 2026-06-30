import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';
import { LocalStorageProvider } from './context/LocalStorageContext';
import { MotionConfigProvider } from './context/MotionConfigProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfigProvider>
      <ThemeProvider>
        <LocalStorageProvider>
          <App />
        </LocalStorageProvider>
      </ThemeProvider>
    </MotionConfigProvider>
  </React.StrictMode>
);
