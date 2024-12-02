import React, { useState, useEffect } from "react";
import axios from "axios";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [editFolder, setEditFolder] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [entry, setEntry] = useState({
    producto: "",
    fecha: "",
    monto: "",
    cantidad: "",
    personaDe: "",
    personaPara: "",
  });
  const [expandedFolders, setExpandedFolders] = useState({});
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Obtener carpetas
  const fetchFolders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/folders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(response.data);
    } catch (err) {
      setError("Error al cargar las carpetas.");
    }
  };

  // Alternar la expansión de una carpeta
  const toggleFolder = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  // Crear o editar carpeta
  const handleSaveFolder = async () => {
    try {
      if (editFolder) {
        const response = await axios.put(
          `http://localhost:5000/api/folders/${editFolder._id}`,
          { name: folderName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolders(
          folders.map((folder) =>
            folder._id === editFolder._id ? response.data : folder
          )
        );
        setEditFolder(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/folders",
          { name: folderName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolders([...folders, response.data]);
      }
      setFolderName("");
    } catch (err) {
      setError("Error al guardar la carpeta.");
    }
  };

  // Agregar o editar entrada
  const handleSaveEntry = async (folderId) => {
    try {
      if (editEntry) {
        // Editar entrada existente
        const response = await axios.put(
          `http://localhost:5000/api/folders/${folderId}/entries/${editEntry._id}`,
          entry,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolders(
          folders.map((folder) =>
            folder._id === folderId ? response.data : folder
          )
        );
        setEditEntry(null);
      } else {
        // Agregar nueva entrada
        const response = await axios.post(
          `http://localhost:5000/api/folders/${folderId}/entries`,
          entry,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolders(
          folders.map((folder) =>
            folder._id === folderId ? response.data : folder
          )
        );
      }
      // Reiniciar formulario
      setEntry({
        producto: "",
        fecha: "",
        monto: "",
        cantidad: "",
        personaDe: "",
        personaPara: "",
      });
    } catch (err) {
      setError("Error al guardar la entrada.");
    }
  };

  // Eliminar entrada
  const handleDeleteEntry = async (folderId, entryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/folders/${folderId}/entries/${entryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFolders(
        folders.map((folder) =>
          folder._id === folderId ? response.data : folder
        )
      );
    } catch (err) {
      setError("Error al eliminar la entrada.");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Folders</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Crear o Editar Carpeta */}
      <div className="mt-4">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Nombre de la carpeta"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSaveFolder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editFolder ? "Actualizar Carpeta" : "Crear Carpeta"}
        </button>
      </div>

      {/* Lista de Carpetas */}
      <div className="mt-4">
        {folders.map((folder) => (
          <div key={folder._id} className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{folder.name}</h2>
              <div>
                <button
                  onClick={() => toggleFolder(folder._id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
                >
                  {expandedFolders[folder._id] ? "Contraer" : "Expandir"}
                </button>
                <button
                  onClick={() => {
                    setEditFolder(folder);
                    setFolderName(folder.name);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
              </div>
            </div>

            {/* Contenido de la Carpeta */}
            {expandedFolders[folder._id] && (
              <>
                {/* Entradas */}
                {folder.entries.map((entry) => (
                  <div key={entry._id} className="border p-2 rounded mb-2">
                    <p>Producto: {entry.producto}</p>
                    <p>Fecha: {entry.fecha}</p>
                    <p>Monto: {entry.monto}</p>
                    <p>Cantidad: {entry.cantidad}</p>
                    <p>De: {entry.personaDe}</p>
                    <p>Para: {entry.personaPara}</p>
                    <button
                      onClick={() => {
                        setEditEntry(entry);
                        setEntry(entry);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(folder._id, entry._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}

                {/* Formulario para agregar o editar entradas */}
                <div className="mt-4">
                  <h3 className="font-bold">
                    {editEntry && editEntry._id ? "Editar Entrada" : "Nueva Entrada"}
                  </h3>
                  <input
                    type="text"
                    value={entry.producto}
                    onChange={(e) =>
                      setEntry({ ...entry, producto: e.target.value })
                    }
                    placeholder="Producto"
                    className="border p-2 rounded mr-2"
                  />
                  <input
                    type="date"
                    value={entry.fecha}
                    onChange={(e) =>
                      setEntry({ ...entry, fecha: e.target.value })
                    }
                    className="border p-2 rounded mr-2"
                  />
                  <input
                    type="number"
                    value={entry.monto}
                    onChange={(e) =>
                      setEntry({ ...entry, monto: parseFloat(e.target.value) })
                    }
                    placeholder="Monto"
                    className="border p-2 rounded mr-2"
                  />
                  <input
                    type="number"
                    value={entry.cantidad}
                    onChange={(e) =>
                      setEntry({ ...entry, cantidad: parseInt(e.target.value) })
                    }
                    placeholder="Cantidad"
                    className="border p-2 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={entry.personaDe}
                    onChange={(e) =>
                      setEntry({ ...entry, personaDe: e.target.value })
                    }
                    placeholder="De"
                    className="border p-2 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={entry.personaPara}
                    onChange={(e) =>
                      setEntry({ ...entry, personaPara: e.target.value })
                    }
                    placeholder="Para"
                    className="border p-2 rounded mr-2"
                  />
                  <button
                    onClick={() => handleSaveEntry(folder._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {editEntry ? "Guardar Cambios" : "Agregar Entrada"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Folders;
