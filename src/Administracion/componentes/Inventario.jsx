import { FaChartBar, FaMoneyBillWave, FaReceipt, FaBoxes, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function Inventario(params) {
    const inventarioItems = [
        { id: 1, name: "Item A", cantidad: 100, status: "En Stock" },
        { id: 2, name: "Item B", cantidad: 50, status: "Poco Stock" },
        { id: 3, name: "Item C", cantidad: 0, status: "Sin Stock" },
      ];
    return(
        <>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Control de Inventario</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar inventario"
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
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
                {inventarioItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.cantidad}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === "In Stock" ? "bg-green-200 text-green-800" : item.status === "Low Stock" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-blue-500 mr-2" aria-label="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-500" aria-label="Delete">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
    )
}

export default Inventario