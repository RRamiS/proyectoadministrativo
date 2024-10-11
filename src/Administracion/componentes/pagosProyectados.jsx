import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalPagos from "./pagosModal"; // El modal para agregar/editar pagos

const PagosProyectados = () => {
  const [pagos, setPagos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPago, setCurrentPago] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener los pagos proyectados
    const fetchPagos = async () => {
      const response = await fetch("https://admapi-production.up.railway.app/api/pagos");
      const data = await response.json();
      setPagos(data);
    };

    fetchPagos();
  }, []);

  const handleAddPago = () => {
    setCurrentPago(null);
    setShowModal(true);
  };

  const handleEditPago = (pago) => {
    setCurrentPago(pago);
    setShowModal(true);
  };

  const handleDeletePago = async (id) => {
    await fetch(`https://admapi-production.up.railway.app/api/pagos/${id}`, { method: "DELETE" });
    setPagos(pagos.filter((pago) => pago._id !== id));
  };

  const handleSubmitPago = async (pagoData) => {
    if (currentPago) {
      // Actualizar pago existente
      const response = await fetch(`https://admapi-production.up.railway.app/api/pagos/${currentPago._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagoData),
      });
      const updatedPago = await response.json();
      setPagos(pagos.map((pago) => (pago._id === updatedPago._id ? updatedPago : pago)));
    } else {
      // Crear nuevo pago
      const response = await fetch("https://admapi-production.up.railway.app/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagoData),
      });
      const newPago = await response.json();
      setPagos([...pagos, newPago]);
    }

    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Pagos Proyectados</h2>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Total Pagos: {pagos.length}</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddPago}
        >
          <FaPlus className="mr-2" /> Agregar Pago
        </button>
      </div>
      <ul>
        {pagos.map((pago) => (
          <li key={pago._id} className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold">{pago.descripcion}</p>
              <p className="text-gray-600">{pago.fecha}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleEditPago(pago)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleDeletePago(pago._id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <ModalPagos
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmitPago}
          pago={currentPago}
        />
      )}
    </div>
  );
};

export default PagosProyectados;
