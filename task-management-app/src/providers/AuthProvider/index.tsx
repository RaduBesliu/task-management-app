import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { User, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { initializeApp } from 'firebase/app';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    initializeApp(firebaseConfig);

    const _auth = getAuth();

    _auth.onAuthStateChanged(async (user) => {
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
    const auth = getAuth();
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
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setUser(undefined);
        setToken(undefined);
        console.log('[USER] User signed out ');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = useMemo(
    () => ({ user, token, signInWithGoogle, signOutWithGoogle }),
    [user, token, signInWithGoogle, signOutWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
