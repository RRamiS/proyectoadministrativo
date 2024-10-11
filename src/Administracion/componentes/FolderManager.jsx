import React, { useState, useEffect } from "react";
import { FaFolder, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate

const FolderManager = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate(); // Para redirigir

  useEffect(() => {
    // Obtener carpetas desde la API
    const fetchFolders = async () => {
      const response = await fetch("https://admapi-production.up.railway.app/api/folders");
      const data = await response.json();
      setFolders(data);
    };
    fetchFolders();
  }, []);

  const addFolder = async () => {
    if (folderName.trim() !== "") {
      const response = await fetch("https://admapi-production.up.railway.app/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName }),
      });
      const newFolder = await response.json();
      setFolders([...folders, newFolder]);
      setFolderName("");
    }
  };

  const deleteFolder = async (id) => {
    await fetch(`https://admapi-production.up.railway.app/api/folders/${id}`, { method: "DELETE" });
    setFolders(folders.filter((folder) => folder._id !== id));
  };

  const openFolder = (id) => {
    navigate(`/carpetas/${id}`); // Redirigir a la ruta de la carpeta seleccionada
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Gestor de Carpetas</h2>

      <div className="flex mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg flex-grow"
          placeholder="Nombre de la Carpeta"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-lg"
          onClick={addFolder}
        >
          <FaPlus /> Añadir Carpeta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
            onClick={() => openFolder(folder._id)} // Redirigir al hacer clic
          >
            <div className="flex items-center">
              <FaFolder className="text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold">{folder.name}</h3>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Evitar que se abra la carpeta cuando se hace clic en el botón de eliminar
                deleteFolder(folder._id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderManager;
