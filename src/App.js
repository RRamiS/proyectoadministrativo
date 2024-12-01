import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginLogoutButton from './Administracion/componentes/LoginLogoutButton'
import AdminDashboard from './Administracion/componentes/AdminDashboard';
import FolderTable from './Administracion/componentes/FolderTable';

const App = () => {
  const { handleRedirectCallback, isLoading } = useAuth0();

  useEffect(() => {
    const processLogin = async () => {
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        try {
          await handleRedirectCallback();
          // Limpia la URL para evitar confusiones
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error al procesar el login:', error);
        }
      }
    };
    processLogin();
  }, [handleRedirectCallback]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div>
        <LoginLogoutButton />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/folders" element={<FolderTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
