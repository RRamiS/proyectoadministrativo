import React, { useState } from "react";
import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const analyticsData = [
    { name: "Ene", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Abr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
  ];

  const ingresosData = [
    { name: "Ventas", value: 5000 },
    { name: "Servicios", value: 3000 },
    { name: "Subscriciones", value: 2000 },
  ];

  const egresosData = [
    { name: "Renta", value: 1000 },
    { name: "Herramientas", value: 500 },
    { name: "Salarios", value: 3000 },
    { name: "Marketing", value: 1000 },
  ];

  const inventarioItems = [
    { id: 1, name: "Item A", cantidad: 100, status: "En Stock" },
    { id: 2, name: "Item B", cantidad: 50, status: "Poco Stock" },
    { id: 3, name: "Item C", cantidad: 0, status: "Sin Stock" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "ingresos":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Ingresos</h2>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Total Ingresos: $10,000</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <FaPlus className="mr-2" /> Add Ingreso
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ingresosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ingresosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "egresos":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Egresos</h2>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Total Egresos: $5,500</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <FaPlus className="mr-2" /> Add Egreso
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={egresosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {egresosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "inventario":
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Control de Inventario</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar inventario"
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <FaPlus className="mr-2" /> Add Item
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Cantidad</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventarioItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.cantidad}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === "In Stock" ? "bg-green-200 text-green-800" : item.status === "Low Stock" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-blue-500 mr-2" aria-label="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-500" aria-label="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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