
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function Analytics() {
    const analyticsData = [
        { name: "Ene", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Abr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
      ];
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
}

export default Analytics;