import React from 'react';
import { User } from 'firebase/auth';

export interface AuthContextType {
  user?: User;
  signInWithGoogle: () => Promise<void>;
  signOutWithGoogle: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  signInWithGoogle: async () => {},
  signOutWithGoogle: async () => {},
});
