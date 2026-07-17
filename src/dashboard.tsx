import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import InstallDashboard from './pages/InstallDashboard';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InstallDashboard />
  </StrictMode>
);
