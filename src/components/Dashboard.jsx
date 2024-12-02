import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";


const Dashboard = () => {
  const location = useLocation();

  // Detectar si estamos en la ruta de Analytics
  const isAnalytics = location.pathname === "/dashboard/analytics";

  return (
    
    <div className={`flex ${isAnalytics ? "flex-col" : "flex-row"} h-screen`}>
      {/* Sidebar o Barra Superior */}
      <div
        className={`${
          isAnalytics
            ? "w-full h-auto flex-row justify-center items-center space-x-6 py-4"
            : "w-1/5 h-full flex-col justify-between space-y-4 py-6"
        } bg-gray-800 text-white flex p-4`}
      >
        <div className={`${isAnalytics ? "text-center" : ""}`}>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav
            className={`flex ${
              isAnalytics ? "flex-row justify-center items-center space-x-4" : "flex-col space-y-2"
            }`}
          >
            <Link
              to="/dashboard/ingresos"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/ingresos" ? "text-blue-400" : ""
              }`}
            >
              Ingresos
            </Link>
            <Link
              to="/dashboard/egresos"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/egresos" ? "text-blue-400" : ""
              }`}
            >
              Egresos
            </Link>
            <Link
              to="/dashboard/folders"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/folders" ? "text-blue-400" : ""
              }`}
            >
              Folders
            </Link>
            <Link
              to="/dashboard/pagos-proyectados"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/pagos-proyectados" ? "text-blue-400" : ""
              }`}
            >
              Pagos Proyectados
            </Link>
            <Link
              to="/dashboard/stock"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/stock" ? "text-blue-400" : ""
              }`}
            >
              Stock
            </Link>
            <Link
              to="/dashboard/analytics"
              className={`hover:text-gray-300 ${
                location.pathname === "/dashboard/analytics" ? "text-blue-400" : ""
              }`}
            >
              Analíticas
            </Link>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className={`${
            isAnalytics ? "mt-0" : "mt-4"
          } bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded`}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 ${isAnalytics ? "mt-20" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
