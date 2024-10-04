// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store'; // Import the store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Wrap the app with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
