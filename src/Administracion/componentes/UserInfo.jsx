import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserInfo = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h3>Información del Usuario:</h3>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;
