import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Type Definitions for Type Safety
export interface Habit {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  category?: string;
  type?: 'yes_no' | 'timer';
  frequency?: string;
  startDate?: string;
  endDate?: string | null;
  priority?: string;
  reminders?: number;
  isComplete: boolean;
  createdAt: string | Timestamp;
}

const auth = getAuth();
const habitsCollection = collection(db, 'habits');

/**
 * ➕ Create a new habit
 * Accepts a full habit object from the creation wizard
 */
export const addHabit = async (habitData: Partial<Habit>) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  await addDoc(habitsCollection, {
    ...habitData,
    userId: user.uid,
    isComplete: false, // Default status
    createdAt: new Date().toISOString(), // Use ISO string for easier sorting/parsing
  });
};

/**
 * 📂 Get all habits for the current user
 * Requires a Firestore Composite Index: userId (ASC) + createdAt (DESC)
 */
export const getAllHabit = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const q = query(
    habitsCollection,
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Habit[];
};

/**
 * 🔍 Get a single habit by ID
 */
export const getHabitById = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'habits', id);
  const habitDoc = await getDoc(ref);

  if (!habitDoc.exists()) throw new Error('Habit not found');

  const data = habitDoc.data();
  if (data.userId !== user.uid) throw new Error('Unauthorized');

  return {
    id: habitDoc.id,
    ...data,
  } as Habit;
};

/**
 * ✏️ Update an existing habit
 */
export const updateHabit = async (
  id: string,
  updates: Partial<Omit<Habit, 'id' | 'userId' | 'createdAt'>>
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'habits', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error('Habit not found');
  if (snap.data().userId !== user.uid) throw new Error('Unauthorized');

  await updateDoc(ref, updates);
};

/**
 * 🗑️ Delete a habit
 */
export const deleteHabit = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'habits', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error('Habit not found');
  if (snap.data().userId !== user.uid) throw new Error('Unauthorized');

  await deleteDoc(ref);
};

/**
 * ✅ Mark a habit as complete/incomplete
 */
export const completeHabit = async (id: string, isComplete: boolean = true) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const ref = doc(db, 'habits', id);
  // Optional: Check ownership here again if strictly needed, 
  // but Firestore rules should handle it in production.
  
  await updateDoc(ref, { isComplete });
};

/**
 * 📊 Analytics: Get counts of completed vs pending habits
 */
export const getHabitCounts = async () => {
  // Note: For large datasets, use Firestore 'count()' aggregation instead of fetching all docs.
  // For now (MVP), fetching all is acceptable.
  const habits = await getAllHabit();
  const completedCount = habits.filter((habit) => habit.isComplete).length;
  const pendingCount = habits.filter((habit) => !habit.isComplete).length;
  
  return { completedCount, pendingCount };
};

/**
 * 📑 Get habits filtered by completion status
 */
export const getAllHabitByStatus = async (isComplete: boolean) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated.');

  const q = query(
    habitsCollection,
    where('userId', '==', user.uid),
    where('isComplete', '==', isComplete),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Habit[];
};