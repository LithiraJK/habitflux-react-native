import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useLoader } from '@/hooks/useLoader'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user : null,
  loading : false

})

const AuthProvider = ({children}:{children:ReactNode}) => {
  const {hideLoader , isLoading, showLoader} = useLoader()
  const [user , setUser] = useState<User | null>(null)

  useEffect(() => {
    showLoader()
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setUser(user)
      hideLoader()
    })
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{user, loading: isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider