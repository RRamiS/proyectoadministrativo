import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-vzdnsztoc6gy1f35.us.auth0.com" 
      clientId="YmlcuWRn6boyQZuxjGMEXxMtdEIIDh0V" 
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://admapi-production.up.railway.app/", 
        
      }}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
