import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

const Analytics = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("https://admapi-production.up.railway.app/api/analytics/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar datos analíticos:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Analíticas</h1>

      {/* Resumen */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Productos en Stock</h2>
          <p>{data.resumen.totalProductos}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Ingresos Totales</h2>
          <p>${data.resumen.totalIngresos}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Egresos Totales</h2>
          <p>${data.resumen.totalEgresos}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pagos Pendientes</h2>
          <p>{data.resumen.pagosPendientes}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Pagos Pagados</h2>
          <p>{data.resumen.pagosPagados}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Ingresos vs Egresos</h2>
        <Bar
          data={{
            labels: ["Ingresos", "Egresos"],
            datasets: [
              {
                label: "Total",
                data: [data.graficos.ingresosEgresos.ingresos, data.graficos.ingresosEgresos.egresos],
                backgroundColor: ["#4caf50", "#f44336"],
              },
            ],
          }}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Estado de Pagos Proyectados</h2>
        <Pie
          data={{
            labels: ["Pendientes", "Pagados"],
            datasets: [
              {
                data: [data.graficos.pagosProyectados.pendientes, data.graficos.pagosProyectados.pagados],
                backgroundColor: ["#ff9800", "#2196f3"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;
