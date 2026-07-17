import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TermsOfService from './pages/TermsOfService';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermsOfService />
  </StrictMode>
);
