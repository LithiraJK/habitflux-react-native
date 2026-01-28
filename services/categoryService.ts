import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from './firebase'; 

export interface Category {
  id?: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  userId: string;
  createdAt?: Timestamp;
}

const categoryCollection = collection(db, 'categories');

export const addCategory = async (
  title: string,
  description: string,
  icon: string,
  color: string
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  return await addDoc(categoryCollection, {
    title,
    description,
    icon,
    color,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
};


export const getAllCategory = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const q = query(
    categoryCollection,
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((dataSet) => {
    const data = dataSet.data();
    return {
      id: dataSet.id,
      title: data.title,
      description: data.description || '',
      icon: data.icon || 'folder',
      color: data.color || '#818CF8',
      createdAt: data.createdAt,
    };
  });
};


export const getCategoryById = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'categories', id);
  const categoryDoc = await getDoc(ref);

  if (!categoryDoc.exists()) throw new Error('Category not found');

  const data = categoryDoc.data();
  if (data.userId !== user.uid) throw new Error('Unauthorized');

  return {
    id: categoryDoc.id,
    ...data,
  };
};


export const updateCategory = async (
  id: string,
  updates: Partial<Omit<Category, 'id' | 'userId' | 'createdAt'>>
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'categories', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error('Category not found');
  if (snap.data().userId !== user.uid) throw new Error('Unauthorized');

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};


export const deleteCategory = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'categories', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error('Category not found');
  if (snap.data().userId !== user.uid) throw new Error('Unauthorized');

  await deleteDoc(ref);
};