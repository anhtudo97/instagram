import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// client side rendered app: react (cra)
// -> database which is firebase and
// -> react-loading-skeleton
// tailwind

// architecture
// -> components, constants, context, helpers, lib( firebase is going to live in here), services (firebase function is here)
