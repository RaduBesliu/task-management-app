import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Task } from './types';

export const getTasksByIds = async (ids: string[]) => {
  const tasksRef = collection(db, 'tasks');
  const tasksSnapshot = await getDocs(tasksRef);
  const tasks: Task[] = [];
  tasksSnapshot.forEach((doc) => {
    if (ids.includes(doc.id)) {
      tasks.push({ id: doc.id, ...doc.data() } as Task);
    }
  });

  return tasks;
};
