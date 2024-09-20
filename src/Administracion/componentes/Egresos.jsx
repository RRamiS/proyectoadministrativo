import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
function Egresos() {
    const egresosData = [
        { name: "Renta", value: 1000 },
        { name: "Herramientas", value: 500 },
        { name: "Salarios", value: 3000 },
        { name: "Marketing", value: 1000 },
      ];
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Egresos</h2>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Total Egresos: $5,500</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Add Egreso
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={egresosData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {egresosData.map((entry, index) => (
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
export default Egresos;