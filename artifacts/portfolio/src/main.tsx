import React from 'react';

// Polyfill React.useEffectEvent for Sanity Studio compatibility on stable React 19
if (!(React as any).useEffectEvent) {
  (React as any).useEffectEvent = function useEffectEvent<A extends any[], R>(
    callback: (...args: A) => R
  ) {
    const ref = React.useRef(callback);
    React.useInsertionEffect(() => {
      ref.current = callback;
    });
    return React.useCallback((...args: A) => {
      return ref.current(...args);
    }, []);
  };
}

import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
