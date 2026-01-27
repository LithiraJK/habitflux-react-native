import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {
    displayName: name,
    photoURL: "",
  });

  await setDoc(doc(db, "users", userCredential.user.uid), {
    name, // name: name
    email,
    role: "user",
    createdAt: new Date(),
  });
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth)
  AsyncStorage.clear()
  //   AsyncStorage.setItem("key", {})
  // AsyncStorage.getItem("key")
  return
}
