// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../helpers/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface User {
  uid: string;
  email: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid, email: user.email!, image: user.photoURL!});
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { email,uid, photoURL } = user;
        console.log("User logged in: ", uid,email,photoURL);
      })}

  const logOut = async () => {
    await auth.signOut();
  };

  const value: AuthContextType = {
    user,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
