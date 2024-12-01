import React, { useState } from "react";
import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaClock, FaFolder, FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import Analytics from "./Analytics";
import IngresoData from "./IngresoData";
import Egresos from "./Egresos";
import Inventario from "./Inventario";
import PagosProyectados from "./pagosProyectados";
import FolderManager from "./FolderManager";
import StockManager from "./StockManager";

const AdminDashboard = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [activeTab, setActiveTab] = useState("analytics");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return <Analytics />;
      case "ingresos":
        return <IngresoData />;
      case "egresos":
        return <Egresos />;
      case "inventario":
        return <StockManager />;
      case "pagos":
        return <PagosProyectados />;
      case "carpetas":
        return <FolderManager />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => loginWithRedirect()}
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-4 text-white bg-gray-800 rounded-lg"
      >
        <FaBars />
      </button>

      {/* Menú lateral */}
      {isSidebarOpen && (
        <div className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4 md:block">
          <h1 className="text-2xl font-bold mb-8">Panel de Admin</h1>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 ${
              activeTab === "analytics"
                ? "bg-blue-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <FaChartBar />
            <span>Analytics</span>
          </button>
          {/* Resto de botones */}
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="p-4 bg-red-500 rounded-lg mt-4"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;
