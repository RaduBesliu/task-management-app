import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Components } from './styled';
import { List } from '../../api/list/types';
import ListCard from './components/ListCard';
import { getLists } from '../../api/list';
import { Dialog } from '@mui/material';
import CreateListModal from '../../modals/CreateListModal';
import { AuthContext } from '../../providers/AuthProvider/context';

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [lists, setLists] = useState<List[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getLists(user?.uid ?? '').then((_lists) => {
      setLists(_lists);
    });
  }, []);

  const onCreateListClick = async () => {
    setIsModalOpen(true);
  };

  return (
    <Components.Container>
      {lists.map((list) => {
        return <ListCard key={list.id} list={list} />;
      })}
      <Components.CreateListButton className={'btn btn-success'} onClick={onCreateListClick}>
        Create List
      </Components.CreateListButton>
      <CreateListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setLists={setLists} />
    </Components.Container>
  );
};

export default Dashboard;
