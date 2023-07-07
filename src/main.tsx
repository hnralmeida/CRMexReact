import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { AuthProvider } from './contexts/authProvider';
import { ExternalAuthService } from '../firebase.ts';
import './index.css';
import ENV from '../env';

// Serviço do Firebase 
const app = ExternalAuthService.getInstance();
app.initialize();

// Classe .env
const env = new ENV();
env.process();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
