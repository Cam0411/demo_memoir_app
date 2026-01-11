import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hide pre-loader after app is mounted
const loader = document.getElementById('loader');
if (loader) {
  // Add a slight delay to ensure content is ready
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);
}