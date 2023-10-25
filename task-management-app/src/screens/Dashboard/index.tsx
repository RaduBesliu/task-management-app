import React, { useContext, useEffect, useState } from 'react';
import { Components } from './styled';
import { List } from '../../api/list/types';
import ListCard from './components/ListCard';
import { deleteList, getLists } from '../../api/list';
import CreateOrEditListModal from '../../modals/CreateOrEditListModal';
import { AuthContext } from '../../providers/AuthProvider/context';
import { Task } from '../../api/task/types';
import { deleteTask } from '../../api/task';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [lists, setLists] = useState<List[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<List | undefined>(undefined);

  useEffect(() => {
    getLists(user?.uid ?? '').then((_lists) => {
      setLists(_lists);
    });
  }, [user?.uid]);

  const onCreateListClick = async () => {
    setModalState(undefined);
    setIsModalOpen(true);
  };

  const onDeleteListClick = async (listId: string) => {
    const list = lists.find((list) => list.id === listId);
    const newLists = lists.filter((list) => list.id !== listId);

    list?.tasks.forEach((task) => {
      deleteTask(task.id).then();
    });

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

  const onUpdateTask = (listId: string, taskId: string, task: Task) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map((_task) => {
          if (_task.id === taskId) {
            return task;
          }

          return _task;
        });

        return {
          ...list,
          tasks: updatedTasks,
        };
      }

      return list;
    });

    setLists(updatedLists);
  };

  return (
    <Components.Container>
      {lists.map((list) => {
        return (
          <ListCard
            key={list.id}
            list={list}
            setLists={setLists}
            deleteList={onDeleteListClick}
            editList={onEditListClick}
            onUpdateTask={onUpdateTask}
          />
        );
      })}
      <Components.CreateListButton className={'btn btn-success'} onClick={onCreateListClick}>
        Create List
      </Components.CreateListButton>
      <CreateOrEditListModal isOpen={isModalOpen} onClose={_onClose} setLists={setLists} modalState={modalState} />
    </Components.Container>
  );
};

export default Dashboard;
