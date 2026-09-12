import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'vantra_auth';

type AuthContextValue = {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [email, setEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (email) {
        localStorage.setItem(STORAGE_KEY, email);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {

      // ignore storage errors (private browsing, etc.)
    }
  }, [email]);

  const login = (nextEmail: string) => setEmail(nextEmail);
  const logout = () => setEmail(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Boolean(email), email, login, logout }}>

      {children}
    </AuthContext.Provider>);

}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
