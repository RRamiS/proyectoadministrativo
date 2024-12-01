import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; 
import AdminDashboard from '../src/Administracion/componentes/AdminDashboard';
import FolderTable from '../src/Administracion/componentes/FolderTable';
import ProtectedRoute from './Administracion/componentes/ProtectedRoute';
// Reemplaza con tus valores de Auth0
const AUTH0_DOMAIN = "https://dev-vzdnsztoc6gy1f35.us.auth0.com/.well-known/jwks.json";
const AUTH0_CLIENT_ID = "YmlcuWRn6boyQZuxjGMEXxMtdEIIDh0V";
const AUTH0_AUDIENCE = "https://dev-vzdnsztoc6gy1f35.us.auth0.com/api/v2/";

function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUTH0_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/carpetas/:id" element={<ProtectedRoute element={<FolderTable />} />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
