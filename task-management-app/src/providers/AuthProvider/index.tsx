import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import React, { useMemo, useState } from 'react';
import { AuthContext } from './context';
import { User, signOut } from 'firebase/auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    const user = result.user;

    setUser(user);
  };

  const signOutWithGoogle = async () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setUser(undefined);
        console.log('[USER] Signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({ user, signInWithGoogle, signOutWithGoogle }),
    [user, signInWithGoogle, signOutWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
