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
