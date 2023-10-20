import { db } from './firebase';

export const generateRandomFirebaseId = () => {
  return db.collection('tasks').doc().id;
};
