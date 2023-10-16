import React from 'react';
import { useNavigate } from 'react-router';
import { Components } from './styled';
import List from './components/List';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Components.Container>
      <List />
    </Components.Container>
  );
};

export default Dashboard;
