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

  const fetchFolders = async () => {
    try {
      const response = await axios.get(
        "https://admapi-production.up.railway.app/api/folders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFolders(response.data);
    } catch (err) {
      setError("Error al cargar las carpetas.");
    }
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  const handleSaveFolder = async () => {
    try {
      if (editFolder) {
        const response = await axios.put(
          `https://admapi-production.up.railway.app/api/folders/${editFolder._id}`,
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
          "https://admapi-production.up.railway.app/api/folders",
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

  const handleSaveEntry = async (folderId) => {
    try {
      if (editEntry) {
        const response = await axios.put(
          `https://admapi-production.up.railway.app/api/folders/${folderId}/entries/${editEntry._id}`,
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
        const response = await axios.post(
          `https://admapi-production.up.railway.app/api/folders/${folderId}/entries`,
          entry,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolders(
          folders.map((folder) =>
            folder._id === folderId ? response.data : folder
          )
        );
      }
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

  const handleDeleteEntry = async (folderId, entryId) => {
    try {
      const response = await axios.delete(
        `https://admapi-production.up.railway.app/api/folders/${folderId}/entries/${entryId}`,
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
        {folders.map((folder) => {
          const totalQuantity = folder.entries.reduce(
            (sum, entry) => sum + entry.cantidad,
            0
          );
          const totalAmount = folder.entries.reduce(
            (sum, entry) => sum + entry.cantidad * entry.monto,
            0
          );

          return (
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

              {expandedFolders[folder._id] && (
                <>
                  {folder.entries.map((entry) => (
                    <div key={entry._id} className="border p-2 rounded mb-2">
                      <p>Producto: {entry.producto}</p>
                      <p>Fecha: {entry.fecha}</p>
                      <p>Monto: {entry.monto}</p>
                      <p>Cantidad: {entry.cantidad}</p>
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
                        onClick={() =>
                          handleDeleteEntry(folder._id, entry._id)
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}

                  <div className="mt-4 p-4 bg-gray-100 rounded">
                    <p className="text-lg font-bold">
                      Cantidad Total:{" "}
                      <span className="text-green-500">{totalQuantity}</span>
                    </p>
                    <p className="text-lg font-bold">
                      Monto Total:{" "}
                      <span className="text-blue-500">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Folders;
