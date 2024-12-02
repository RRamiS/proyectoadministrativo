import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
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
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
