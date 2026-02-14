import { useLoader } from "@/hooks/useLoader";
import { initializeUserCategories } from "@/services/categoryService";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { hideLoader, isLoading, showLoader } = useLoader();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    showLoader();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await initializeUserCategories();
      }
      hideLoader();
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
