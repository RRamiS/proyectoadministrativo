import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'; // Importar Auth0Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Auth0Provider
  domain="https://dev-vzdnsztoc6gy1f35.us.auth0.com"
  clientId="YmlcuWRn6boyQZuxjGMEXxMtdEIIDh0V"
  authorizationParams={{
    redirect_uri: "https://proyectoadministrativo.vercel.app/callback",
    audience: "https://dev-vzdnsztoc6gy1f35.us.auth0.com/api/v2/",
  }}
>
  <App />
</Auth0Provider>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de la app
reportWebVitals();
