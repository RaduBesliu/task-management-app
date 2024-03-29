import { List } from './types';
import { getTasksByIds } from '../task';

export const parseLists = async (uid: string, lists: any[]) => {
  const filteredLists = lists.filter((list) => list.data().userId === uid);

  const parsedLists = filteredLists.map(async (list) => {
    const data = list.data();
    return {
      ...data,
      id: list.id,
      tasks: await getTasksByIds(data.tasks),
    } as List;
  });

  return Promise.all(parsedLists);
};
