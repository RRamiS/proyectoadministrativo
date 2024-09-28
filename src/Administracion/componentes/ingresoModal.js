import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const IngresoModal = ({ showModal, handleClose, handleSubmit, ingreso }) => {
  const [formData, setFormData] = useState({
    tipo: ingreso ? ingreso.tipo : "",
    valor: ingreso ? ingreso.valor : "",
  });

  useEffect(() => {
    if (ingreso) {
      setFormData({ tipo: ingreso.tipo, valor: ingreso.valor });
    }
  }, [ingreso]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({ tipo: "", valor: "" });
  };

  return (
    <AnimatePresence>
      {showModal && (
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
                {ingreso ? "Editar Ingreso" : "Agregar Ingreso"}
              </h2>
              <button onClick={handleClose}>
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tipo de Ingreso</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Valor</label>
                <input
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {ingreso ? "Guardar Cambios" : "Agregar Ingreso"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IngresoModal;
