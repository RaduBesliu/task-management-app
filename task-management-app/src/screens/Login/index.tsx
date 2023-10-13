import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Navigate, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const { user, signInWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      // navigate to the previous page
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Sign in</button>
    </>
  );
};

export default Login;
