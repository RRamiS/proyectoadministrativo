import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const PagosModal = ({ showModal, handleClose, handleSubmit, pago }) => {
  const [formData, setFormData] = useState({
    descripcion: pago ? pago.descripcion : "",
    fecha: pago ? new Date(pago.fecha).toISOString().split("T")[0] : "",
    monto: pago ? pago.monto : "",
    estado: pago ? pago.estado : "Pendiente",
  });

  useEffect(() => {
    if (pago) {
      setFormData({
        descripcion: pago.descripcion,
        fecha: new Date(pago.fecha).toISOString().split("T")[0],
        monto: pago.monto,
        estado: pago.estado,
      });
    }
  }, [pago]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({ descripcion: "", fecha: "", monto: "", estado: "Pendiente" });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {pago ? "Editar Pago" : "Añadir Pago"}
          </h2>
          <button onClick={handleClose}>
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Monto</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Atrasado">Atrasado</option>
              <option value="Pagado">Pagado</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {pago ? "Guardar Cambios" : "Añadir Pago"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PagosModal;
