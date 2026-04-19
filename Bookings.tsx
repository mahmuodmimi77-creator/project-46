import React, { useEffect, useState, createContext, useContext } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem('riverescape_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
    setLoading(false);
  }, []);
  const login = (email: string) => {
    // Simple mock login: find user by email, or default to standard user
    const foundUser = mockUsers.find((u) => u.email === email) || mockUsers[0];
    setUser(foundUser);
    localStorage.setItem('riverescape_user', JSON.stringify(foundUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('riverescape_user');
  };
  if (loading) return null;
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout
      }}>
      
      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}