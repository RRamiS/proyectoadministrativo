import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar Routes en lugar de Switch
import AdminDashboard from '../src/Administracion/componentes/AdminDashboard';
import FolderTable from '../src/Administracion/componentes/FolderTable'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes> {/* Usar Routes en lugar de Switch */}
        <Route path="/" element={<AdminDashboard />} /> {/* Element para el componente */}
        <Route path="/carpetas/:id" element={<FolderTable />} /> {/* Element para la carpeta */}
      </Routes>
    </Router>
  );
}

export default App;
