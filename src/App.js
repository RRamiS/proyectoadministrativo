import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; // Importa useAuth0

import AdminDashboard from '../src/Administracion/componentes/AdminDashboard';
import FolderTable from '../src/Administracion/componentes/FolderTable';

// Reemplaza con tus valores de Auth0
const AUTH0_DOMAIN = "https://dev-vzdnsztoc6gy1f35.us.auth0.com";
const AUTH0_CLIENT_ID = "YmlcuWRn6boyQZuxjGMEXxMtdEIIDh0V";
const AUTH0_AUDIENCE = "https://dev-vzdnsztoc6gy1f35.us.auth0.com/api/v2/";

// Componente Callback para manejar la autenticación
const Callback = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? (
    <div>Redirigiendo...</div>
  ) : (
    <div>Error al autenticar</div>
  );
};

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
          <Route path="/carpetas/:id" element={<FolderTable />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
