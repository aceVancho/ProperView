import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Agent = {
  _id: string;
  email: string;
};

type AuthState = {
  token: string;
  agent: Agent;
};

type AuthContextType = {
  auth: AuthState | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  loading?: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);
const tokenName = 'properViewAuthToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(tokenName);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState;
        console.log('Stored auth data:', parsed);
        setAuth(parsed);
      }
    } catch (err) {
      console.error('Failed to parse auth data:', err);
      localStorage.removeItem(tokenName); // Clean up invalid entry
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    console.log('Attempting login with email:', email);
    try {
      const res = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      const authData = { token: data.token, agent: data.agent };
      setAuth(authData);
      localStorage.setItem(tokenName, JSON.stringify(authData));
      console.log('Login successful:', authData);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(tokenName);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
