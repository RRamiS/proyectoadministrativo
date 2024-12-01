import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginLogoutButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="bg-red-500 text-white p-2 rounded-lg"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 text-white p-2 rounded-lg"
    >
      Login
    </button>
  );
};

export default LoginLogoutButton;
