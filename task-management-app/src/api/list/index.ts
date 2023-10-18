import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { parseLists } from './parser';

export const getLists = async () => {
  const lists = await getDocs(collection(db, 'lists'));
  return await parseLists(lists.docs);
};
