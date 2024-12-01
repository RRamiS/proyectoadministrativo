import React, { useState } from "react";
import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaClock, FaFolder, FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react"; // Importar Auth0
import Analytics from "./Analytics";
import IngresoData from "./IngresoData";
import Egresos from "./Egresos";
import Inventario from "./Inventario";
import PagosProyectados from "./pagosProyectados";
import FolderManager from "./FolderManager";
import StockManager from "./StockManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); // Hooks de Auth0

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

  return (
    <div className="flex min-h-screen">
      {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-4 text-white bg-gray-800 rounded-lg"
      >
        <FaBars />
      </button>

      {/* Tab Bar Lateral */}
      {isSidebarOpen && (
        <div className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4 md:block">
          <h1 className="text-2xl font-bold mb-8">Panel de Admin</h1>
          {isAuthenticated ? (
            <>
              <div className="mb-4">
                <p className="text-sm">Bienvenido,</p>
                <p className="text-lg font-bold">{user?.name || "Usuario"}</p>
              </div>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithRedirect}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Login
            </button>
          )}
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <FaChartBar className="transition-transform duration-300" />
            <span>Analytics</span>
          </button>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "ingresos"
                ? "bg-gradient-to-r from-green-500 to-teal-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("ingresos")}
          >
            <FaMoneyBillWave className="transition-transform duration-300" />
            <span>Ingresos</span>
          </button>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "egresos"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("egresos")}
          >
            <FaReceipt className="transition-transform duration-300" />
            <span>Egresos</span>
          </button>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "inventario"
                ? "bg-gradient-to-r from-red-500 to-pink-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("inventario")}
          >
            <FaBoxes className="transition-transform duration-300" />
            <span>Inventario</span>
          </button>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "pagos"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("pagos")}
          >
            <FaClock className="transition-transform duration-300" />
            <span>Pagos Proyectados</span>
          </button>
          <button
            className={`p-4 rounded-lg flex items-center justify-start space-x-2 transform transition-all duration-500 ease-in-out ${
              activeTab === "carpetas"
                ? "bg-gradient-to-r from-gray-500 to-gray-900 scale-105 shadow-lg"
                : "bg-gray-800 hover:bg-gray-700 hover:scale-105"
            }`}
            onClick={() => setActiveTab("carpetas")}
          >
            <FaFolder className="transition-transform duration-300" />
            <span>Carpetas</span>
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
