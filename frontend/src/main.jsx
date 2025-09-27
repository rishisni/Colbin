import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx'; // Import the new provider
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider> {/* Wrap the app with the ToastProvider */}
        <App />
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
);