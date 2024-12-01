import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const StockManager = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState("");
  const { getAccessTokenSilently } = useAuth0(); // Hook para obtener el token de acceso

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = await getAccessTokenSilently(); // Obtener token
        const response = await fetch("https://admapi-production.up.railway.app/api/stock", {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token al encabezado
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStocks(data);
        } else {
          console.error("Error al obtener los datos", response.status);
        }
      } catch (error) {
        console.error("Error al obtener el token o datos", error);
      }
    };

    fetchStocks();
  }, [getAccessTokenSilently]);

  const addStock = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("https://admapi-production.up.railway.app/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token al encabezado
        },
        body: JSON.stringify({ name: newStock }),
      });
      if (response.ok) {
        const addedStock = await response.json();
        setStocks([...stocks, addedStock]);
        setNewStock("");
      } else {
        console.error("Error al agregar stock", response.status);
      }
    } catch (error) {
      console.error("Error al agregar stock", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Stock</h1>
      <input
        type="text"
        value={newStock}
        onChange={(e) => setNewStock(e.target.value)}
        placeholder="Nuevo stock"
      />
      <button onClick={addStock}>Agregar Stock</button>
      <ul>
        {stocks.map((stock) => (
          <li key={stock._id}>{stock.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockManager;
