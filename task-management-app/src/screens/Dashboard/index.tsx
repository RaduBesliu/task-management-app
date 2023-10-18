import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Components } from './styled';
import { List } from '../../api/list/types';
import ListCard from './components/ListCard';
import { getLists } from '../../api/list';

const Dashboard = () => {
  const navigate = useNavigate();

  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    getLists().then((_lists) => {
      setLists(_lists);
    });
  }, []);

  return (
    <Components.Container>
      {lists.map((list) => {
        return <ListCard key={list.id} list={list} />;
      })}
      <Components.CreateListButton className={'btn btn-success'}>Create List</Components.CreateListButton>
    </Components.Container>
  );
};

export default Dashboard;
