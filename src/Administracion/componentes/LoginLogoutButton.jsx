import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginLogoutButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bienvenido, {user?.name}</p>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginLogoutButton;
