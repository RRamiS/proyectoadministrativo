import React, { useState, useEffect } from "react";
import axios from "axios";

const Ingresos = () => {
  const [ingresos, setIngresos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [editIngreso, setEditIngreso] = useState(null); // Ingreso en edición
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Obtener los ingresos del backend
  const fetchIngresos = async () => {
    try {
      const response = await axios.get("https://admapi-production.up.railway.app/api/ingresos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngresos(response.data);
    } catch (err) {
      setError("Error al cargar los ingresos.");
    }
  };

  // Agregar un ingreso
  const handleAddIngreso = async () => {
    try {
      const newIngreso = { descripcion, monto: parseFloat(monto) };
      const response = await axios.post("https://admapi-production.up.railway.app/api/ingresos", newIngreso, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngresos([...ingresos, response.data]);
      setDescripcion("");
      setMonto("");
    } catch (err) {
      setError("Error al agregar el ingreso.");
    }
  };

  // Actualizar un ingreso
  const handleUpdateIngreso = async () => {
    if (!editIngreso) return;

    try {
      const response = await axios.put(
        `https://admapi-production.up.railway.app/api/ingresos/${editIngreso._id}`,
        { descripcion, monto: parseFloat(monto) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIngresos(
        ingresos.map((ingreso) => (ingreso._id === editIngreso._id ? response.data : ingreso))
      );
      setEditIngreso(null);
      setDescripcion("");
      setMonto("");
    } catch (err) {
      setError("Error al actualizar el ingreso.");
    }
  };

  // Eliminar un ingreso
  const handleDeleteIngreso = async (id) => {
    try {
      await axios.delete(`https://admapi-production.up.railway.app/api/ingresos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngresos(ingresos.filter((ingreso) => ingreso._id !== id));
    } catch (err) {
      setError("Error al eliminar el ingreso.");
    }
  };

  useEffect(() => {
    fetchIngresos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Ingresos</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para agregar o editar ingresos */}
      <div className="mt-4">
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Monto"
          className="border p-2 rounded mr-2"
        />
        {editIngreso ? (
          <button
            onClick={handleUpdateIngreso}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        ) : (
          <button
            onClick={handleAddIngreso}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        )}
      </div>

      {/* Tabla de ingresos */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso._id}>
              <td className="border border-gray-300 px-4 py-2">{ingreso.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{ingreso.monto}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setEditIngreso(ingreso);
                    setDescripcion(ingreso.descripcion);
                    setMonto(ingreso.monto);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteIngreso(ingreso._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ingresos;
