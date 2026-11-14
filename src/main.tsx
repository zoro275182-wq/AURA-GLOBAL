import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </HashRouter>
  </React.StrictMode>
);
