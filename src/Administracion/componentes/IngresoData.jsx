import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import IngresoModal from "./ingresoModal"; 

const IngresoData = () => {
  const [ingresosData, setIngresosData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [totalIngresos, setTotalIngresos] = useState(0); // Para calcular el total

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Función para obtener los ingresos desde la API
  const fetchIngresos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ingresos");
      setIngresosData(response.data);
      // Calculo total ingresos
      const total = response.data.reduce((acc, ingreso) => acc + ingreso.valor, 0);
      setTotalIngresos(total);
    } catch (error) {
      console.error("Error fetching ingresos:", error);
    }
  };

  useEffect(() => {
    fetchIngresos(); // Get
  }, []);

  // Función para agregar un nuevo ingreso
  const handleAddIngreso = () => {
    setSelectedIngreso(null); 
    setShowModal(true); 
  };

  // Función para editar un ingreso 
  const handleEditIngreso = (ingreso) => {
    setSelectedIngreso(ingreso); 
    setShowModal(true); 
  };

  // Función para eliminar un ingreso
  const handleDeleteIngreso = async (id) => {
    try {
      await axios.delete(`https://admapi-production.up.railway.app/api/ingresos/${id}`);
      setIngresosData(ingresosData.filter((ingreso) => ingreso._id !== id));
    } catch (error) {
      console.error("Error deleting ingreso:", error);
    }
  };

  // Manejo de envios del formulario
  const handleSubmit = async (formData) => {
    try {
      if (selectedIngreso) {
        // Editando form
        await axios.put(`https://admapi-production.up.railway.app/api/ingresos/${selectedIngreso._id}`, formData);
        setIngresosData(
          ingresosData.map((ingreso) =>
            ingreso._id === selectedIngreso._id ? { ...ingreso, ...formData } : ingreso
          )
        );
      } else {
        // Agregando un form
        const response = await axios.post("https://admapi-production.up.railway.app/api/ingresos", formData);
        setIngresosData([...ingresosData, response.data]);
      }
      setShowModal(false); 
      fetchIngresos(); // Refresh
    } catch (error) {
      console.error("Error saving ingreso:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Ingresos</h2>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Total Ingresos: ${totalIngresos}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddIngreso}
        >
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
            dataKey="valor"
          >
            {ingresosData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Valor</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresosData.map((ingreso) => (
            <tr key={ingreso._id} className="border-b">
              <td className="p-2">{ingreso.tipo}</td>
              <td className="p-2">${ingreso.valor}</td>
              <td className="p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEditIngreso(ingreso)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteIngreso(ingreso._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar ingresos */}
      <IngresoModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        ingreso={selectedIngreso}
      />
    </div>
  );
};

export default IngresoData;
