import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { auth } from '../../utils/firebase';
import firebase from 'firebase/compat/app';
import UserInfo = firebase.UserInfo;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfo>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const _token = await user.getIdToken();
        setToken(_token);
        console.log(`[USER] User signed in: ${user.email}`);
      } else {
        setUser(undefined);
        console.log('[USER] User not signed in');
      }
    });
  }, []);

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    const user = result.user;

    setToken(token);
    setUser(user);
    console.log(`[USER] User signed in: ${user.displayName}`);
    console.log(`[USER] User token: ${token}`);

    navigate('/dashboard');
  };

  const signOutWithGoogle = async () => {
    signOut(auth)
      .then(() => {
        setUser(undefined);
        setToken(undefined);
        console.log('[USER] User signed out ');
      })
      .catch((error) => {
        console.log(error);
      });

    navigate('/');
  };

  const value = useMemo(
    () => ({ user, token, signInWithGoogle, signOutWithGoogle }),
    [user, token, signInWithGoogle, signOutWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
