import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ModalEgreso from "./egresosModal"; // Importa el modal

function Egresos() {
  const [egresosData, setEgresosData] = useState([]);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedEgreso, setSelectedEgreso] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Obtener los egresos desde la API
  useEffect(() => {
    const fetchEgresos = async () => {
      const response = await fetch("https://admapi-production.up.railway.app/api/egresos");
      const data = await response.json();
      setEgresosData(data);
      setTotalEgresos(data.reduce((acc, egreso) => acc + egreso.value, 0)); // Calcular el total
    };

    fetchEgresos();
  }, []);

  const handleAddEgreso = () => {
    setSelectedEgreso(null);
    setShowModal(true);
  };

  const handleEditEgreso = (egreso) => {
    setSelectedEgreso(egreso);
    setShowModal(true);
  };

  const handleDeleteEgreso = async (id) => {
    await fetch(`https://admapi-production.up.railway.app/api/egresos/${id}`, { method: "DELETE" });
    setEgresosData(egresosData.filter((egreso) => egreso._id !== id));
    const deletedEgreso = egresosData.find((egreso) => egreso._id === id);
    setTotalEgresos(totalEgresos - deletedEgreso.value); // Actualizar el total
  };

  const handleSubmitEgreso = async (egresoData) => {
    if (selectedEgreso) {
      // Editar egreso existente
      const response = await fetch(`https://admapi-production.up.railway.app/api/egresos/${selectedEgreso._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(egresoData),
      });
      const updatedEgreso = await response.json();
      setEgresosData(
        egresosData.map((egreso) => (egreso._id === updatedEgreso._id ? updatedEgreso : egreso))
      );
    } else {
      // Crear nuevo egreso
      const response = await fetch("https://admapi-production.up.railway.app/api/egresos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(egresoData),
      });
      const newEgreso = await response.json();
      setEgresosData([...egresosData, newEgreso]);
      setTotalEgresos(totalEgresos + newEgreso.value); // Actualizar el total
    }
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Egresos</h2>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Total Egresos: ${totalEgresos}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddEgreso}
        >
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
      <ul className="mt-4">
        {egresosData.map((egreso) => (
          <li key={egreso._id} className="flex justify-between items-center mb-2">
            <span>{egreso.name}: ${egreso.value}</span>
            <div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                onClick={() => handleEditEgreso(egreso)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleDeleteEgreso(egreso._id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ModalEgreso
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmitEgreso}
        egreso={selectedEgreso}
      />
    </div>
  );
}

export default Egresos;
