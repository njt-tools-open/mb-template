import { createRoot } from 'react-dom/client';

import App from './App';
import { prepare } from './prepare';

import './translation';

import './index.css';
import { registerJsBridge } from './utils/console-js-bridge';

registerJsBridge();

const mount = () => {
  prepare(() => {
    createRoot(document.getElementById('root') as HTMLElement).render(<App />);
  });
};

mount();
