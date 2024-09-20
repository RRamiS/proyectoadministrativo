import React, { useState } from "react";
import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Analytics from "./Analytics";
import IngresoData from "./IngresoData";
import Egresos from "./Egresos";
import Inventario from "./Inventario";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <Analytics/>
        );
      case "ingresos":
        return (
        <IngresoData/>
        );
      case "egresos":
        return (
         <Egresos/>
        );
      case "inventario":
        return (
       <Inventario/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Panel de Administracion</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button
          className={`p-4 rounded-lg shadow-md flex items-center justify-center ${activeTab === "analytics" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("analytics")}
        >
          <FaChartBar className="mr-2" /> Analytics
        </button>
        <button
          className={`p-4 rounded-lg shadow-md flex items-center justify-center ${activeTab === "ingresos" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("ingresos")}
        >
          <FaMoneyBillWave className="mr-2" /> Ingresos
        </button>
        <button
          className={`p-4 rounded-lg shadow-md flex items-center justify-center ${activeTab === "egresos" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("egresos")}
        >
          <FaReceipt className="mr-2" /> Egresos
        </button>
        <button
          className={`p-4 rounded-lg shadow-md flex items-center justify-center ${activeTab === "inventario" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveTab("inventario")}
        >
          <FaBoxes className="mr-2" /> Inventario
        </button>
      </div>
      {renderActiveTab()}
    </div>
  );
};

export default AdminDashboard;