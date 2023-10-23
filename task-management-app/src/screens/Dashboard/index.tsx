import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Components } from './styled';
import { List } from '../../api/list/types';
import ListCard from './components/ListCard';
import { deleteList, getLists } from '../../api/list';
import { Dialog } from '@mui/material';
import CreateOrEditListModal from '../../modals/CreateOrEditListModal';
import { AuthContext } from '../../providers/AuthProvider/context';

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [lists, setLists] = useState<List[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<List | undefined>(undefined);

  useEffect(() => {
    getLists(user?.uid ?? '').then((_lists) => {
      setLists(_lists);
    });
  }, []);

  const onCreateListClick = async () => {
    setModalState(undefined);
    setIsModalOpen(true);
  };

  const onDeleteListClick = async (listId: string) => {
    const newLists = lists.filter((list) => list.id !== listId);
    setLists(newLists);

    await deleteList(listId);
  };

  const onEditListClick = async (list: List) => {
    setModalState(list);
    setIsModalOpen(true);
  };

  const _onClose = () => {
    setIsModalOpen(false);
    setModalState(undefined);
  };

  return (
    <Components.Container>
      {lists.map((list) => {
        return <ListCard key={list.id} list={list} deleteList={onDeleteListClick} editList={onEditListClick} />;
      })}
      <Components.CreateListButton className={'btn btn-success'} onClick={onCreateListClick}>
        Create List
      </Components.CreateListButton>
      <CreateOrEditListModal isOpen={isModalOpen} onClose={_onClose} setLists={setLists} modalState={modalState} />
    </Components.Container>
  );
};

export default Dashboard;
