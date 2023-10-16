import React, { useContext, useEffect } from 'react';
import { Components } from './styled';
import { getLists } from '../../../../api/list';

const List = () => {
  useEffect(() => {
    getLists().then((res) => {
      console.log(res);
    });
  }, []);

  return <Components.Container></Components.Container>;
};

export default List;
