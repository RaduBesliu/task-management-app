import { db } from './firebase';

export const generateRandomFirebaseId = () => {
  return db.collection('tasks').doc().id;
};

export const invertHex = (hex: string) => {
  return '#' + (Number(`0x1${hex.slice(1)}`) ^ 0xffffff).toString(16).slice(1).toUpperCase();
};
