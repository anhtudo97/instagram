import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// client side rendered app: react (cra)
// -> database which is firebase and
// -> react-loading-skeleton
// tailwind

// architecture
// -> components, constants, context, helpers, lib( firebase is going to live in here), services (firebase function is here)
