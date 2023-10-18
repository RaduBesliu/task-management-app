import { List } from './types';
import { getTasksByIds } from '../task';

export const parseLists = async (lists: any[]) => {
  const parsedLists = lists.map(async (list) => {
    const data = list.data();
    return {
      ...data,
      id: list.id,
      tasks: await getTasksByIds(data.tasks),
    } as List;
  });

  return Promise.all(parsedLists);
};
