import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate

const FolderTable = () => {
  const { id } = useParams(); // Obtener el ID de la carpeta desde la URL
  const [folder, setFolder] = useState(null);
  const [newEntry, setNewEntry] = useState({
    producto: "",
    fecha: "",
    monto: "",
    personaDe: "",
    personaPara: ""
  });

  const navigate = useNavigate(); // Para redirigir

  useEffect(() => {
    const fetchFolder = async () => {
      const response = await fetch(`http://localhost:5000/api/folders/${id}`);
      const data = await response.json();
      setFolder(data);
    };

    fetchFolder();
  }, [id]);

  const addEntry = async () => {
    const response = await fetch(`http://localhost:5000/api/folders/${id}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });
    
    if (response.ok) {
      const addedEntry = await response.json();
      setFolder((prevFolder) => ({ ...prevFolder, entries: [...prevFolder.entries, addedEntry] }));
      setNewEntry({ producto: "", fecha: "", monto: "", personaDe: "", personaPara: "" }); // Limpiar el formulario
    } else {
      console.error("Error al agregar la entrada");
    }
  };

  const deleteEntry = async (entryId) => {
    await fetch(`http://localhost:5000/api/folders/${id}/entries/${entryId}`, { method: "DELETE" });
    setFolder((prevFolder) => ({
      ...prevFolder,
      entries: prevFolder.entries.filter(entry => entry._id !== entryId),
    }));
  };

  // Calcular el monto total
  const totalAmount = folder ? folder.entries.reduce((total, entry) => total + parseFloat(entry.monto || 0), 0) : 0;

  if (!folder) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Carpeta: {folder.name}</h2>
      
      {/* Monto Total */}
      <h3 className="text-lg font-semibold">Monto Total: ${totalAmount.toFixed(2)}</h3>

      {/* Botón para volver atrás */}
      <button
        onClick={() => navigate(-1)} // Volver a la página anterior
        className="bg-gray-500 text-white p-2 rounded-lg mt-4"
      >
        Volver
      </button>

      {/* Formulario para agregar nuevas entradas */}
      <h3 className="text-lg font-semibold mt-6">Agregar Nueva Entrada</h3>
      <div className="flex mb-4">
        <input type="text" placeholder="Producto" value={newEntry.producto} onChange={(e) => setNewEntry({ ...newEntry, producto: e.target.value })} className="p-2 border border-gray-300 rounded-lg flex-grow" />
        <input type="date" value={newEntry.fecha} onChange={(e) => setNewEntry({ ...newEntry, fecha: e.target.value })} className="p-2 border border-gray-300 rounded-lg ml-2" />
        <input type="number" placeholder="Monto" value={newEntry.monto} onChange={(e) => setNewEntry({ ...newEntry, monto: e.target.value })} className="p-2 border border-gray-300 rounded-lg ml-2" />
        <input type="text" placeholder="De" value={newEntry.personaDe} onChange={(e) => setNewEntry({ ...newEntry, personaDe: e.target.value })} className="p-2 border border-gray-300 rounded-lg ml-2" />
        <input type="text" placeholder="Para" value={newEntry.personaPara} onChange={(e) => setNewEntry({ ...newEntry, personaPara: e.target.value })} className="p-2 border border-gray-300 rounded-lg ml-2" />
        <button onClick={addEntry} className="bg-blue-500 text-white p-2 ml-2 rounded-lg">Agregar</button>
      </div>

      {/* Tabla de entradas */}
      <table className="table-auto w-full mt-4 border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Monto</th>
            <th className="p-2 border">De</th>
            <th className="p-2 border">Para</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {folder.entries.map((entry) => (
            <tr key={entry._id}>
              <td className="p-2 border">{entry.producto}</td>
              <td className="p-2 border">{new Date(entry.fecha).toLocaleDateString() || 'Sin Fecha'}</td>
              <td className="p-2 border">${entry.monto ? parseFloat(entry.monto).toFixed(2) : '0.00'}</td>
              <td className="p-2 border">{entry.personaDe}</td>
              <td className="p-2 border">{entry.personaPara}</td>
              <td className="p-2 border">
                <button onClick={() => deleteEntry(entry._id)} className="text-red-500">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FolderTable;
