import React, { useState, useEffect } from "react";
import axios from "axios";

const PagosProyectados = () => {
  const [pagos, setPagos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Obtener todos los pagos proyectados
  const fetchPagos = async () => {
    try {
      const response = await axios.get("https://admapi-production.up.railway.app/api/Pago", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos(response.data);
    } catch (err) {
      setError("Error al cargar los pagos proyectados.");
    }
  };

  // Agregar un nuevo pago proyectado
  const handleAddPago = async () => {
    try {
      const newPago = { descripcion, monto: parseFloat(monto), fechaPago };
      const response = await axios.post("https://admapi-production.up.railway.app/api/Pago", newPago, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos([...pagos, response.data]);
      setDescripcion("");
      setMonto("");
      setFechaPago("");
    } catch (err) {
      setError("Error al agregar el pago proyectado.");
    }
  };

  // Actualizar el estado de un pago proyectado
  const handleUpdatePago = async (id) => {
    try {
      const response = await axios.put(
        `https://admapi-production.up.railway.app/api/Pago/${id}`,
        { estado: "pagado" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPagos(pagos.map((pago) => (pago._id === id ? response.data : pago)));
    } catch (err) {
      setError("Error al actualizar el estado del pago.");
    }
  };

  // Eliminar un pago proyectado
  const handleDeletePago = async (id) => {
    try {
      await axios.delete(`https://admapi-production.up.railway.app/api/Pago/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos(pagos.filter((pago) => pago._id !== id));
    } catch (err) {
      setError("Error al eliminar el pago proyectado.");
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Pagos Proyectados</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para agregar pagos proyectados */}
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
        <input
          type="date"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleAddPago}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Pago
        </button>
      </div>

      {/* Tabla de pagos proyectados */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago._id}>
              <td className="border border-gray-300 px-4 py-2">{pago.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{pago.monto}</td>
              <td className="border border-gray-300 px-4 py-2">{pago.fechaPago}</td>
              <td className="border border-gray-300 px-4 py-2">{pago.estado}</td>
              <td className="border border-gray-300 px-4 py-2">
                {pago.estado === "pendiente" && (
                  <button
                    onClick={() => handleUpdatePago(pago._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Marcar como Pagado
                  </button>
                )}
                <button
                  onClick={() => handleDeletePago(pago._id)}
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

export default PagosProyectados;
