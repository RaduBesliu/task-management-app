import React from 'react';
import { Components } from './styled';
import { Task } from '../../../../api/task/types';
import { faSquare, faSquareCheck, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import IconWrapper from '../../../../components/IconWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TaskCard = ({
  task,
  onChangeTaskCompletedStatus,
  onDeleteTaskClick,
  onEditTaskClick,
}: {
  task: Task;
  onChangeTaskCompletedStatus: (task: Task) => Promise<void>;
  onDeleteTaskClick: (taskId: string) => void;
  onEditTaskClick: (task: Task) => void;
}) => {
  return (
    <Components.Container color={task.color} textColor={task.textColor} isCompleted={task.isCompleted}>
      <IconWrapper bottom={8} right={32} onClick={() => onEditTaskClick(task)}>
        <FontAwesomeIcon icon={faPen} />
      </IconWrapper>
      <IconWrapper bottom={8} right={8} onClick={() => onDeleteTaskClick(task.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </IconWrapper>
      <IconWrapper top={8} right={8} onClick={() => onChangeTaskCompletedStatus(task).then()}>
        {task.isCompleted ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
      </IconWrapper>
      <Components.CardTitle>{task.title}</Components.CardTitle>
      <Components.CardDescription>{task.description}</Components.CardDescription>
    </Components.Container>
  );
};

export default TaskCard;
