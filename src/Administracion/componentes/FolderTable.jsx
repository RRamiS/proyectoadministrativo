import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FolderTable = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [newEntry, setNewEntry] = useState({
    producto: "",
    fecha: "",
    monto: "",
    cantidad: "",
    personaDe: "",
    personaPara: ""
  });
  const [editingEntry, setEditingEntry] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const response = await fetch(`https://admapi-production.up.railway.app/api/folders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFolder(data);
        } else {
          console.error("Error al obtener los datos de la carpeta");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchFolder();
  }, [id]);

  const addEntry = async () => {
    try {
      const response = await fetch(`https://admapi-production.up.railway.app/api/folders/${id}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        const addedEntry = await response.json();
        setFolder((prevFolder) => ({ ...prevFolder, entries: [...prevFolder.entries, addedEntry] }));
        setNewEntry({ producto: "", fecha: "", monto: "", cantidad: "", personaDe: "", personaPara: "" });
      } else {
        console.error("Error al agregar la entrada");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      const response = await fetch(`https://admapi-production.up.railway.app/api/folders/${id}/entries/${entryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFolder((prevFolder) => ({
          ...prevFolder,
          entries: prevFolder.entries.filter((entry) => entry._id !== entryId),
        }));
      } else {
        console.error("Error al eliminar la entrada");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const editEntry = async () => {
    try {
      const response = await fetch(`https://admapi-production.up.railway.app/api/folders/${id}/entries/${editingEntry._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEntry),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        setFolder((prevFolder) => ({
          ...prevFolder,
          entries: prevFolder.entries.map((entry) =>
            entry._id === updatedEntry._id ? updatedEntry : entry
          ),
        }));
        setEditingEntry(null);
      } else {
        console.error("Error al actualizar la entrada");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Calcular el monto total
  const totalAmount = folder
    ? folder.entries.reduce((total, entry) => {
        const monto = parseFloat(entry.monto || 0);
        const cantidad = parseFloat(entry.cantidad || 0);
        return total + monto * cantidad;
      }, 0)
    : 0;

  if (!folder) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Carpeta: {folder.name}</h2>
      <h3 className="text-lg font-semibold">Monto Total: ${totalAmount.toFixed(2)}</h3>

      {/* Botón para volver a la página de inicio */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white p-2 rounded-lg mt-4"
      >
        Volver a Inicio
      </button>

      {/* Formulario para agregar nuevas entradas */}
      <h3 className="text-lg font-semibold mt-6">Agregar Nueva Entrada</h3>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Producto"
          value={newEntry.producto}
          onChange={(e) => setNewEntry({ ...newEntry, producto: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <input
          type="date"
          value={newEntry.fecha}
          onChange={(e) => setNewEntry({ ...newEntry, fecha: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Monto"
          value={newEntry.monto}
          onChange={(e) => setNewEntry({ ...newEntry, monto: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newEntry.cantidad}
          onChange={(e) => setNewEntry({ ...newEntry, cantidad: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button onClick={addEntry} className="bg-blue-500 text-white p-2 rounded-lg">
          Agregar
        </button>
      </div>

      {/* Tabla de entradas */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4 border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Producto</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Monto</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {folder.entries.map((entry) => (
              <tr key={entry._id}>
                <td className="p-2 border">{entry.producto}</td>
                <td className="p-2 border">
                  {new Date(entry.fecha).toLocaleDateString() || "Sin Fecha"}
                </td>
                <td className="p-2 border">
                  ${entry.monto ? parseFloat(entry.monto).toFixed(2) : "0.00"}
                </td>
                <td className="p-2 border">{entry.cantidad || "0"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => setEditingEntry(entry)}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteEntry(entry._id)}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario para editar entrada */}
      {editingEntry && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Editar Entrada</h3>
          <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0">
            <input
              type="text"
              placeholder="Producto"
              value={editingEntry.producto}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, producto: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg flex-grow"
            />
            <input
              type="date"
              value={editingEntry.fecha}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, fecha: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Monto"
              value={editingEntry.monto}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, monto: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={editingEntry.cantidad}
              onChange={(e) =>
                setEditingEntry({ ...editingEntry, cantidad: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button onClick={editEntry} className="bg-green-500 text-white p-2 rounded-lg">
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderTable;
