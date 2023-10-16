import React from 'react';
import firebase from 'firebase/compat/app';
import UserInfo = firebase.UserInfo;

export interface AuthContextType {
  user?: UserInfo;
  signInWithGoogle: () => Promise<void>;
  signOutWithGoogle: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  signInWithGoogle: async () => {},
  signOutWithGoogle: async () => {},
});
