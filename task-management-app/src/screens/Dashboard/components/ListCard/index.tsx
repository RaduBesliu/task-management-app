import React, { useContext, useEffect } from 'react';
import { Components } from './styled';
import { List } from '../../../../api/list/types';

const ListCard = ({ list }: { list: List }) => {
  return (
    <Components.Container color={list.color}>
      <Components.Title textColor={list.textColor}>{list.title}</Components.Title>
    </Components.Container>
  );
};

export default ListCard;
