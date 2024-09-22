import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import ModalForm from "./modalForm"; // Asegúrate de que este componente exista
import { Toaster,toast } from "sonner";
const Inventario = () => {
  const [inventarioItems, setInventarioItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // Para saber si se está editando un ítem

  // Función para obtener los items del inventario desde la API
  const fetchInventario = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setInventarioItems(response.data); // Asegúrate de que la respuesta contenga los datos correctos
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventario(); // Llamada inicial para obtener los datos del inventario
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setInventarioItems(inventarioItems.filter((item) => item._id !== id));
      toast.success("Producto eliminado")
    } catch (error) {
      toast.error("Error al eliminar el producto")
      console.error("Error deleting item:", error);
    }
  };

  const handleAddClick = () => {
    setCurrentItem(null); // Limpiar el ítem actual para agregar un nuevo
    setShowModal(true); // Abrir el modal
  };

  const handleEditClick = (item) => {
    setCurrentItem(item); // Establecer el ítem actual para editar
    setShowModal(true); // Abrir el modal
  };

  const handleSubmit = async (formData) => {
    if (currentItem) {
      // Si hay un ítem actual, se está editando
      await axios.put(`http://localhost:5000/api/items/${currentItem._id}`, formData);
      toast.success("Producto actualizado")
    } else {
      // Si no hay ítem actual, se está agregando
      await axios.post("http://localhost:5000/api/items", formData);
      toast.success("Producto agregado")
    }
    fetchInventario(); // Actualizar la lista de inventario
    setShowModal(false); // Cerrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal sin realizar cambios
  };

  const filteredItems = inventarioItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <Toaster position="top-center" richColors ></Toaster>
      <h2 className="text-2xl font-semibold mb-4">Control de Inventario</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar inventario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={handleAddClick}
        >
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
          {filteredItems.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.cantidad}</td>
              <td className="p-2">
            {/*     <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.cantidad >100
                      ? "bg-green-200 text-green-800"
                      : item.cantidad < 50
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {item.status}
                </span> */}

            {item.cantidad>100?(<><span className="px-2 py-1 rounded-full text-xs bg-green-200 text-grenn-800">Hay stock</span></>):(<></>)}
            {item.cantidad<100 && item.cantidad!=0?(<><span className="px-2 py-1 rounded-full text-xs bg-yellow-200 text-yellow-800">Poco Stock</span></>):(<></>)}
            {item.cantidad===0?(<><span className="px-2 py-1 rounded-full text-xs bg-red-200 text-red-800"> No hay Stock</span></>):(<></>)}
              </td>  
              <td className="p-2">
                <button
                  className="text-blue-500 mr-2"
                  aria-label="Edit"
                  onClick={() => handleEditClick(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  aria-label="Delete"
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalForm
        showModal={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        item={currentItem} // Pasar el ítem actual al modal para edición
      />
    </div>
  );
};

export default Inventario;
