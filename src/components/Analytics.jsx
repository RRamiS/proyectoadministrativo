import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";
import axios from "axios";

// Registrar componentes necesarios de Chart.js
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, PointElement);

const Analytics = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("https://admapi-production.up.railway.app/api/analytics", {
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
    return <p className="text-center mt-8">Cargando datos...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Analíticas</h1>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">Productos en Stock</h2>
          <p className="text-2xl">{data.resumen.totalProductos}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">Ingresos Totales</h2>
          <p className="text-2xl">${data.resumen.totalIngresos}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">Egresos Totales</h2>
          <p className="text-2xl">${data.resumen.totalEgresos}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">Pagos Pendientes</h2>
          <p className="text-2xl">{data.resumen.pagosPendientes}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-bold">Pagos Pagados</h2>
          <p className="text-2xl">{data.resumen.pagosPagados}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingresos vs Egresos */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-bold mb-2">Ingresos vs Egresos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estado de Pagos Proyectados */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-bold mb-2">Estado de Pagos Proyectados</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Histórico de Ingresos y Egresos */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-bold mb-2">Histórico de Ingresos y Egresos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <Line
                data={{
                  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
                  datasets: [
                    {
                      label: "Ingresos",
                      data: [500, 700, 800, 600, 1000],
                      borderColor: "#4caf50",
                      fill: false,
                    },
                    {
                      label: "Egresos",
                      data: [400, 500, 600, 700, 900],
                      borderColor: "#f44336",
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución de Stock */}
        <div className="bg-white p-4 rounded shadow w-full">
          <h2 className="text-xl font-bold mb-2">Distribución de Stock</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <Bar
                data={{
                  labels: data.graficos.productosPorCantidad.map((p) => p.nombre),
                  datasets: [
                    {
                      label: "Cantidad",
                      data: data.graficos.productosPorCantidad.map((p) => p.cantidad),
                      backgroundColor: "#2196f3",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: "y",
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
