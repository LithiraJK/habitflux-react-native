import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { NotificationService } from "./notificationService";

export interface Habit {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  category?: string;
  priority?: "High" | "Medium" | "Low";
  color?: string;
  icon?: string;

  type: "yes_no" | "timer" | "count";

  frequency: {
    type: "daily" | "weekly" | "monthly" | "specific_days";
    daysOfWeek?: number[];
    interval?: number;
  };

  startDate: string;
  endDate?: string | null;
  reminders?: {
    time: string;
    type: "notification" | "alarm" | "none";
    schedule: "always" | "specific_days" | "days_before";
  }[];

  isComplete: boolean;
  dailyTarget: number;
  dailyProgress: number;

  history: {
    [date: string]: {
      status: "completed" | "failed" | "skipped" | "partial";
      progress: number;
    };
  };

  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  isArchived: boolean;
  notificationIds?: string[];

  createdAt: string | Timestamp;
}

const auth = getAuth();
const habitsCollection = collection(db, "habits");

// Helper function to get today's date as YYYY-MM-DD
const getTodayDateString = () => new Date().toISOString().split("T")[0];

export const addHabit = async (habitData: Partial<Habit>) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  await addDoc(habitsCollection, {
    ...habitData,
    userId: user.uid,

    isComplete: false,
    dailyProgress: 0,
    dailyTarget: habitData.dailyTarget ?? 1,
    frequency: habitData.frequency || { type: "daily", interval: 1 },

    currentStreak: 0,
    bestStreak: 0,
    totalCompleted: 0,
    history: {},
    isArchived: false,

    createdAt: new Date().toISOString(),
  });
};

export const getAllHabit = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const q = query(
    habitsCollection,
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Habit[];
};

export const getHabitById = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "habits", id);
  const habitDoc = await getDoc(ref);

  if (!habitDoc.exists()) throw new Error("Habit not found");

  const data = habitDoc.data() as Habit;

  if (data.userId !== user.uid) throw new Error("Unauthorized");

  return {
    id: habitDoc.id,
    ...data,
  };
};

export const toggleHabitCompletion = async (
  id: string,
  isComplete: boolean,
  dateStr?: string,
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "habits", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Habit not found");
  const data = snap.data() as Habit;

  if (data.userId !== user.uid) throw new Error("Unauthorized");

  const targetDate = dateStr || getTodayDateString();
  const isToday = targetDate === getTodayDateString();
  const newHistory = { ...(data.history || {}) };

  let newCurrentStreak = data.currentStreak || 0;
  let newTotalCompleted = data.totalCompleted || 0;
  let newBestStreak = data.bestStreak || 0;

  if (isComplete) {
    newHistory[targetDate] = {
      status: "completed",
      progress: data.dailyTarget || 1,
    };

    // Only update stats if completing today's habit
    if (isToday) {
      newTotalCompleted += 1;
      newCurrentStreak += 1;

      if (newCurrentStreak > newBestStreak) {
        newBestStreak = newCurrentStreak;
      }
    }
  } else {
    delete newHistory[targetDate];

    // Only update stats if uncompleting today's habit
    if (isToday) {
      newTotalCompleted = Math.max(0, newTotalCompleted - 1);
      newCurrentStreak = Math.max(0, newCurrentStreak - 1);
    }
  }

  await updateDoc(ref, {
    isComplete: isToday ? isComplete : data.isComplete, // Only update isComplete for today
    dailyProgress:
      isToday && isComplete
        ? data.dailyTarget || 1
        : isToday
          ? 0
          : data.dailyProgress,
    history: newHistory,
    currentStreak: newCurrentStreak,
    bestStreak: newBestStreak,
    totalCompleted: newTotalCompleted,
  });
};

export const updateHabit = async (
  id: string,
  updates: Partial<Omit<Habit, "id" | "userId" | "createdAt">>,
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "habits", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Habit not found");

  if (snap.data().userId !== user.uid) throw new Error("Unauthorized");

  await updateDoc(ref, updates);
};

export const deleteHabit = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "habits", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Habit not found");
  const data = snap.data() as Habit;

  if (data.userId !== user.uid) throw new Error("Unauthorized");

  // Cancel any scheduled notifications for this habit
  try {
    if (data.notificationIds && data.notificationIds.length > 0) {
      for (const notiId of data.notificationIds) {
        await NotificationService.cancel(notiId);
      }
    }
  } catch (error) {
    console.error("Error cancelling notifications during deletion:", error);
  }

  await deleteDoc(ref);
};

export const getHabitCounts = async () => {
  const habits = await getAllHabit();
  const completedCount = habits.filter((habit) => habit.isComplete).length;
  const pendingCount = habits.filter((habit) => !habit.isComplete).length;

  return { completedCount, pendingCount };
};

export const getAllHabitByStatus = async (isComplete: boolean) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const q = query(
    habitsCollection,
    where("userId", "==", user.uid),
    where("isComplete", "==", isComplete),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Habit[];
};
