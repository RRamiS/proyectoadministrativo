import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://admapi-production.up.railway.app/api/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token); // Guardar token en localStorage
      setUser({ token }); // Actualizar estado global del usuario
      navigate("/dashboard"); // Redirigir al dashboard
    } catch (error) {
      setError("Login fallido. Verifica tus credenciales.");
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("https://admapi-production.up.railway.app/api/users/register", { email, password });
      setIsRegister(false); // Cambiar a modo login tras registro exitoso
      setError(null);
    } catch (error) {
      setError("Registro fallido. El correo puede estar en uso.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </h2>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          onClick={isRegister ? handleRegister : handleLogin}
          className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </button>
        <p
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null); // Limpiar errores al cambiar de formulario
          }}
          className="mt-4 text-sm text-center text-blue-500 cursor-pointer"
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión aquí." : "¿No tienes cuenta? Regístrate aquí."}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
