import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Ingresos from "./components/Ingresos";
import Egresos from "./components/Egresos";
import Folders from "./components/Folders";
import PagosProyectados from "./components/PagosProyectados";
import Analytics from "./components/Analytics";
import StockManager from "./components/StockManager";
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<LoginPage setUser={setUser} />} />

        {/* Ruta del Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<p className="text-lg text-gray-700">Selecciona una opción del menú para comenzar.</p>} />
          <Route path="ingresos" element={<Ingresos />} />
          <Route path="egresos" element={<Egresos />} />
          <Route path="folders" element={<Folders />} />
          <Route path="pagos-proyectados" element={<PagosProyectados />} />
          <Route path="stock" element={<StockManager />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Redirige cualquier ruta desconocida al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
