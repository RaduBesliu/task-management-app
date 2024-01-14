import React, { Dispatch, SetStateAction, useState } from 'react';
import { Components } from './styled';
import { List } from '../../../../api/list/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import IconWrapper from '../../../../components/IconWrapper';
import { invertHex } from '../../../../utils';
import TaskCard from '../TaskCard';
import { Task } from '../../../../api/task/types';
import { deleteTask, updateTask } from '../../../../api/task';
import CreateOrEditTaskModal from '../../../../modals/CreateOrEditTaskModal';
import { updateList } from '../../../../api/list';

const ListCard = ({
  list,
  setLists,
  deleteList,
  editList,
  onUpdateTask,
}: {
  list: List;
  setLists: Dispatch<SetStateAction<List[]>>;
  deleteList: (listId: string) => Promise<void>;
  editList: (list: List) => void;
  onUpdateTask: (listId: string, taskId: string, task: Task) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<Task | undefined>(undefined);

  const _invertedColor = invertHex(list.color);

  const onCreateTaskClick = () => {
    if (list.taskLimit && list.tasks.length >= list.taskLimit) {
      alert(`You can't add more than ${list.taskLimit} ${list.taskLimit === 1 ? 'task' : 'tasks'} to this list.`);
      return;
    }

    setModalState(undefined);
    setIsModalOpen(true);
  };

  const onDeleteTaskClick = async (taskId: string) => {
    setLists((prevLists) => {
      return prevLists.map((_list) => {
        if (_list.id === list.id) {
          const newTasks = _list.tasks.filter((task) => task.id !== taskId);

          return {
            ..._list,
            tasks: newTasks,
          };
        }

        return _list;
      });
    });

    await updateList(list.id, {
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId).map((task) => task.id),
    });

    await deleteTask(taskId);
  };

  const onEditListClick = (task: Task) => {
    setModalState(task);
    setIsModalOpen(true);
  };

  const _onClose = () => {
    setIsModalOpen(false);
    setModalState(undefined);
  };

  const changeTaskCompletedStatus = async (task: Task) => {
    const updatedTask = {
      ...task,
      isCompleted: !task.isCompleted,
    };

    onUpdateTask(list.id, task.id, updatedTask);
    await updateTask(task.id, updatedTask);
  };

  return (
    <Components.Container color={list.color}>
      <IconWrapper onClick={() => deleteList(list.id)} left={16} top={16}>
        <FontAwesomeIcon icon={faTrash} color={_invertedColor} />
      </IconWrapper>
      <IconWrapper onClick={() => editList(list)} right={16} top={16}>
        <FontAwesomeIcon icon={faPen} color={_invertedColor} />
      </IconWrapper>
      <Components.Title textColor={list.textColor}>{list.title}</Components.Title>
      {list.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onChangeTaskCompletedStatus={changeTaskCompletedStatus}
          onDeleteTaskClick={onDeleteTaskClick}
          onEditTaskClick={onEditListClick}
        />
      ))}
      <Components.CreateTaskButton className={'btn btn-success'} onClick={onCreateTaskClick}>
        +
      </Components.CreateTaskButton>
      <CreateOrEditTaskModal
        isOpen={isModalOpen}
        onClose={_onClose}
        list={list}
        setLists={setLists}
        modalState={modalState}
      />
    </Components.Container>
  );
};

export default ListCard;
