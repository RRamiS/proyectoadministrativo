import React, { useState, useEffect } from "react";
import axios from "axios";

const StockManager = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [editProducto, setEditProducto] = useState(null); // Estado para editar
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Obtener todos los productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stock", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data);
    } catch (err) {
      setError("Error al cargar productos.");
    }
  };

  // Agregar o editar un producto
  const handleSaveProducto = async () => {
    try {
      if (editProducto) {
        // Editar producto existente
        const response = await axios.put(
          `http://localhost:5000/api/stock/${editProducto._id}`,
          { nombre, cantidad: parseFloat(cantidad), precio: parseFloat(precio) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProductos(
          productos.map((producto) =>
            producto._id === editProducto._id ? response.data : producto
          )
        );
        setEditProducto(null);
      } else {
        // Agregar nuevo producto
        const response = await axios.post(
          "http://localhost:5000/api/stock",
          { nombre, cantidad: parseFloat(cantidad), precio: parseFloat(precio) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProductos([...productos, response.data]);
      }

      // Limpiar formulario
      setNombre("");
      setCantidad("");
      setPrecio("");
    } catch (err) {
      setError("Error al guardar producto.");
    }
  };

  // Eliminar un producto
  const handleDeleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stock/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(productos.filter((producto) => producto._id !== id));
    } catch (err) {
      setError("Error al eliminar producto.");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Gestión de Stock</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario para agregar o editar productos */}
      <div className="mt-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del Producto"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSaveProducto}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editProducto ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </div>

      {/* Tabla de productos */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.precio}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setEditProducto(producto);
                    setNombre(producto.nombre);
                    setCantidad(producto.cantidad);
                    setPrecio(producto.precio);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProducto(producto._id)}
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

export default StockManager;
