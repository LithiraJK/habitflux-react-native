import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

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
    name,
    email,
    role: "user",
    createdAt: new Date(),
  });
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
  await AsyncStorage.clear();
  return;
};

// Google Sign-In Configuration

GoogleSignin.configure({
  webClientId:
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
    "304091545400-51v2suh775bpeaikmstrk528keneuat6.apps.googleusercontent.com",
  offlineAccess: true,
  scopes: ["profile", "email"],
});

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (!idToken) throw new Error("ID Token missing");

    const credential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(auth, credential);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...userDoc.data(),
      };
    }


    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }
};
