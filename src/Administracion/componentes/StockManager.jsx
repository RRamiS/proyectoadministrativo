import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth0} from "@auth0/auth0-react";
import apiClient from "../../axiosConfig";

const StockManager = () => {
  const { getAccessTokenSilently } = useAuth0(); // Hook para obtener el token
  const [stock, setStock] = useState([]);
  const [newStock, setNewStock] = useState({
    producto: "",
    cantidad: "",
    fechaIngreso: "",
  });
  const [editStock, setEditStock] = useState(null);

  // Obtener inventario al cargar el componente
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const token = await getAccessTokenSilently(); // Obtiene el token
        const response = await apiClient.get("/stock", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStock(response.data);
      } catch (error) {
        console.error("Error al obtener el stock", error);
      }
    };
    fetchStock();
  }, [getAccessTokenSilently]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  // Agregar nuevo producto
  const handleAddStock = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await apiClient.post("/stock", newStock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock([...stock, response.data]);
      setNewStock({ producto: "", cantidad: "", fechaIngreso: "" });
    } catch (error) {
      console.error("Error al agregar stock", error);
    }
  };

  // Editar producto
  const handleEditStock = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await apiClient.put(`/stock/${id}`, editStock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(
        stock.map((item) => (item._id === id ? response.data : item))
      );
      setEditStock(null);
    } catch (error) {
      console.error("Error al editar stock", error);
    }
  };

  // Eliminar producto
  const handleDeleteStock = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await apiClient.delete(`/stock/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(stock.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error al eliminar stock", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Stock</h1>
      <div className="mb-4">
        <input
          type="text"
          name="producto"
          placeholder="Producto"
          value={newStock.producto}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={newStock.cantidad}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="fechaIngreso"
          value={newStock.fechaIngreso}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddStock}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Agregar
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item._id}>
              <td>{item.producto}</td>
              <td>{item.cantidad}</td>
              <td>{item.fechaIngreso}</td>
              <td>
                <button
                  onClick={() => setEditStock(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => handleDeleteStock(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockManager;
