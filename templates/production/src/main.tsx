import { createRoot } from 'react-dom/client';

import App from './App';
import { prepare } from './prepare';

import './translation';

import './index.css';

const mount = () => {
  prepare(() => {
    createRoot(document.getElementById('root') as HTMLElement).render(<App />);
  });
};

mount();
