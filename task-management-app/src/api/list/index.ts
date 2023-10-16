import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export const getLists = async () => {
  const lists = await getDocs(collection(db, 'lists'));
  return lists.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
