import React from 'react';
import { Components } from './styled';
import { List } from '../../../../api/list/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import IconWrapper from '../../../../components/IconWrapper';
import { invertHex } from '../../../../utils';

const ListCard = ({
  list,
  deleteList,
  editList,
}: {
  list: List;
  deleteList: (listId: string) => Promise<void>;
  editList: (list: List) => void;
}) => {
  const _invertedColor = invertHex(list.color);

  return (
    <Components.Container color={list.color}>
      <IconWrapper onClick={() => deleteList(list.id)} left={16} top={16}>
        <FontAwesomeIcon icon={faTrash} color={_invertedColor} />
      </IconWrapper>
      <IconWrapper onClick={() => editList(list)} right={16} top={16}>
        <FontAwesomeIcon icon={faPen} color={_invertedColor} />
      </IconWrapper>
      <Components.Title textColor={list.textColor}>{list.title}</Components.Title>
    </Components.Container>
  );
};

export default ListCard;
