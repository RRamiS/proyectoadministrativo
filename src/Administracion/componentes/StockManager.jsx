import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const StockManager = () => {
  const [stock, setStock] = useState([]);
  const [newStock, setNewStock] = useState({
    producto: "",
    cantidad: "",
    fechaIngreso: "",
  });
  const [editStock, setEditStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      const token = await getAccessTokenSilently(); // Obtener el token desde Auth0
      const response = await fetch("https://admapi-production.up.railway.app/api/stock", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
      });
      const data = await response.json();
      console.log(data);
    };

    fetchStock();
  }, []);

  const addStock = async () => {
    const response = await fetch("https://admapi-production.up.railway.app/api/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newStock),
    });

    if (response.ok) {
      const addedStock = await response.json();
      setStock([...stock, addedStock]);
      setNewStock({ producto: "", cantidad: "", fechaIngreso: "" });
    } else {
      console.error("Error al agregar el stock");
    }
  };

  const updateStock = async () => {
    const response = await fetch(`https://admapi-production.up.railway.app/api/stock/${editStock._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editStock),
    });

    if (response.ok) {
      const updatedStock = await response.json();
      setStock(stock.map((item) => (item._id === updatedStock._id ? updatedStock : item)));
      setEditStock(null);
    } else {
      console.error("Error al editar el stock");
    }
  };

  const deleteStock = async (id) => {
    const response = await fetch(`https://admapi-production.up.railway.app/api/stock/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      setStock(stock.filter((item) => item._id !== id));
    } else {
      console.error("Error al eliminar el stock");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Stock</h2>

      {/* Formulario para agregar o editar stock */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Producto"
          value={editStock ? editStock.producto : newStock.producto}
          onChange={(e) =>
            editStock
              ? setEditStock({ ...editStock, producto: e.target.value })
              : setNewStock({ ...newStock, producto: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={editStock ? editStock.cantidad : newStock.cantidad}
          onChange={(e) =>
            editStock
              ? setEditStock({ ...editStock, cantidad: e.target.value })
              : setNewStock({ ...newStock, cantidad: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-lg mr-2"
        />
        <input
          type="date"
          value={editStock ? editStock.fechaIngreso : newStock.fechaIngreso}
          onChange={(e) =>
            editStock
              ? setEditStock({ ...editStock, fechaIngreso: e.target.value })
              : setNewStock({ ...newStock, fechaIngreso: e.target.value })
          }
          className="p-2 border border-gray-300 rounded-lg mr-2"
        />
        {editStock ? (
          <button
            onClick={updateStock}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Actualizar
          </button>
        ) : (
          <button
            onClick={addStock}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Agregar
          </button>
        )}
      </div>

      {/* Tabla de stock */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Fecha Ingreso</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">{item.producto}</td>
              <td className="p-2 border">{item.cantidad}</td>
              <td className="p-2 border">
                {new Date(item.fechaIngreso).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => setEditStock(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteStock(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  <FaTrash />
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
