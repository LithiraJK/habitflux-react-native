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
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export interface Category {
  id?: string;
  title: string;
  icon: string;
  color: string;
  isDefault: boolean;
  userId: string;
  createdAt?: Timestamp;
}

const categoryCollection = collection(db, "categories");

const DEFAULT_CATEGORIES = [
  { title: "Quit a bad habit", icon: "ban", color: "#F87171" },
  { title: "Art", icon: "brush", color: "#FB923C" },
  { title: "Task", icon: "time", color: "#FACC15" },
  { title: "Meditation", icon: "leaf", color: "#4ADE80" },
  { title: "Study", icon: "school", color: "#818CF8" },
];

let isInitializing = false;

export const initializeUserCategories = async () => {
  const user = auth.currentUser;
  if (!user || isInitializing) return;

  try {
    isInitializing = true;
    const q = query(categoryCollection, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    // if no categories exist for the user, add default categories
    if (snapshot.empty) {
      const promises = DEFAULT_CATEGORIES.map((cat) =>
        addDoc(categoryCollection, {
          ...cat,
          userId: user.uid,
          isDefault: true,
          entries: 0,
          createdAt: serverTimestamp(),
        }),
      );
      await Promise.all(promises);
      console.log("Default categories initialized for:", user.uid);
    }
  } catch (error) {
    console.error("Initialization Error:", error);
  } finally {
    isInitializing = false;
  }
};

export const addCategory = async (
  title: string,
  icon: string,
  color: string,
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  return await addDoc(categoryCollection, {
    title,
    icon,
    color,
    isDefault: false,
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
};

export const getAllCategory = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const q = query(
    categoryCollection,
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((dataSet) => {
    const data = dataSet.data();
    return {
      id: dataSet.id,
      title: data.title || "New Category",
      icon: data.icon || "folder",
      color: data.color || "#818CF8",
      isDefault: data.isDefault || false,
      userId: data.userId,
      entries: data.entries || 0,
      createdAt: data.createdAt,
    } as Category;
  });
};

export const getCategoryById = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "categories", id);
  const categoryDoc = await getDoc(ref);

  if (!categoryDoc.exists()) throw new Error("Category not found");

  const data = categoryDoc.data();
  if (data.userId !== user.uid) throw new Error("Unauthorized access");

  return {
    id: categoryDoc.id,
    ...data,
  };
};

export const updateCategory = async (
  id: string,
  updates: Partial<Omit<Category, "id" | "userId" | "createdAt">>,
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "categories", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Category not found");
  if (snap.data().userId !== user.uid) throw new Error("Unauthorized");

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteCategory = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const ref = doc(db, "categories", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Category not found");
  if (snap.data().userId !== user.uid) throw new Error("Unauthorized");

  await deleteDoc(ref);
};
