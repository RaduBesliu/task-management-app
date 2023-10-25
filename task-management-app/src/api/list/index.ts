import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { parseLists } from './parser';
import { List } from './types';

export const getLists = async (uid: string) => {
  const lists = await getDocs(collection(db, 'lists'));

  return await parseLists(uid, lists.docs);
};

export const createList = async (list: List) => {
  await db.collection('lists').add(list);
};

export const deleteList = async (id: string) => {
  await db.collection('lists').doc(id).delete();
};

export const updateList = async (id: string, list: any) => {
  await db.collection('lists').doc(id).update(list);
};
