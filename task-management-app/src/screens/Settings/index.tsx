import React, { useContext } from 'react';
import { Components } from './styled';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Button } from 'react-bootstrap';

const Settings = () => {
  const navigate = useNavigate();

  const { user, signOutWithGoogle } = useContext(AuthContext);

  return (
    <Components.Container>
      <h1>Settings</h1>
      <Components.Label>Email</Components.Label>
      <h3>{user?.email}</h3>
      <Components.Label>Name</Components.Label>
      <h3>{user?.displayName}</h3>
      <Button variant='danger' onClick={signOutWithGoogle}>
        Sign out
      </Button>
    </Components.Container>
  );
};

export default Settings;
