import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function IngresoData(params) {
    const ingresosData = [
        { name: "Ventas", value: 5000 },
        { name: "Servicios", value: 3000 },
        { name: "Subscriciones", value: 2000 },
      ];
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Ingresos</h2>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Total Ingresos: $10,000</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Add Ingreso
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ingresosData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ingresosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
}

export default IngresoData