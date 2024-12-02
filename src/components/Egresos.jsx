import React, { useState, useEffect } from "react";
import axios from "axios";

const Egresos = () => {
  const [egresos, setEgresos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [editEgreso, setEditEgreso] = useState(null); // Egreso en edición
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Obtener los egresos del backend
  const fetchEgresos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/egresos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEgresos(response.data);
    } catch (err) {
      setError("Error al cargar los egresos.");
    }
  };

  // Agregar un egreso
  const handleAddEgreso = async () => {
    try {
      const newEgreso = { descripcion, monto: parseFloat(monto) };
      const response = await axios.post("http://localhost:5000/api/egresos", newEgreso, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEgresos([...egresos, response.data]);
      setDescripcion("");
      setMonto("");
    } catch (err) {
      setError("Error al agregar el egreso.");
    }
  };

  // Actualizar un egreso
  const handleUpdateEgreso = async () => {
    if (!editEgreso) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/egresos/${editEgreso._id}`,
        { descripcion, monto: parseFloat(monto) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEgresos(
        egresos.map((egreso) => (egreso._id === editEgreso._id ? response.data : egreso))
      );
      setEditEgreso(null);
      setDescripcion("");
      setMonto("");
    } catch (err) {
      setError("Error al actualizar el egreso.");
    }
  };

  // Eliminar un egreso
  const handleDeleteEgreso = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/egresos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEgresos(egresos.filter((egreso) => egreso._id !== id));
    } catch (err) {
      setError("Error al eliminar el egreso.");
    }
  };

  useEffect(() => {
    fetchEgresos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Egresos</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para agregar o editar egresos */}
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
        {editEgreso ? (
          <button
            onClick={handleUpdateEgreso}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        ) : (
          <button
            onClick={handleAddEgreso}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        )}
      </div>

      {/* Tabla de egresos */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {egresos.map((egreso) => (
            <tr key={egreso._id}>
              <td className="border border-gray-300 px-4 py-2">{egreso.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{egreso.monto}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setEditEgreso(egreso);
                    setDescripcion(egreso.descripcion);
                    setMonto(egreso.monto);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteEgreso(egreso._id)}
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

export default Egresos;
