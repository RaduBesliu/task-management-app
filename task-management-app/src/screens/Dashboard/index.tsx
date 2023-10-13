import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Navigate, useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();

  const { signOutWithGoogle } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/')}>Go to home</button>
      <button onClick={signOutWithGoogle}>Sign out</button>
    </div>
  );
};

export default Dashboard;
