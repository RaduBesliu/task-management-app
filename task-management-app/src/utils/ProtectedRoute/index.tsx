import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Navigate } from 'react-router';

// @ts-ignore
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
