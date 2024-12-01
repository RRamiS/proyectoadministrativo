import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Administracion/componentes/AdminDashboard';
import FolderTable from './Administracion/componentes/FolderTable';
import LoginLogoutButton from './Administracion/componentes/LoginLogoutButton';

const App = () => {
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
