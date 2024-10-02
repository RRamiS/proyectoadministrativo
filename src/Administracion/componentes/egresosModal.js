import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ModalEgreso = ({ showModal, handleClose, handleSubmit, egreso }) => {
  const [formData, setFormData] = useState({
    name: egreso ? egreso.name : "",
    value: egreso ? egreso.value : "",
  });

  useEffect(() => {
    if (egreso) {
      setFormData({ name: egreso.name, value: egreso.value });
    }
  }, [egreso]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({ name: "", value: "" });
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
                {egreso ? "Editar Egreso" : "Agregar Egreso"}
              </h2>
              <button onClick={handleClose}>
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Valor</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {egreso ? "Guardar Cambios" : "Agregar Egreso"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalEgreso;
