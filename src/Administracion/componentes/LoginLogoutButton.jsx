import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginLogoutButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="p-4 bg-gray-100 flex items-center justify-between">
      {isAuthenticated ? (
        <>
          <div>
            <p className="font-bold">Hola, {user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <button
            onClick={() =>
              logout({
                returnTo: window.location.origin, // Redirige al usuario después de cerrar sesión
              })
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginLogoutButton;
