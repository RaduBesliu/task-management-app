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

export const createTask = async (task: Task) => {
  await db.collection('tasks').doc(task.id).set(task);
};

export const updateTask = async (id: string, task: Task) => {
  await db.collection('tasks').doc(id).update(task);
};

export const deleteTask = async (id: string) => {
  await db.collection('tasks').doc(id).delete();
};
