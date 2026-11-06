'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, phone?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  demoLogin: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sareehub_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading user session', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem('sareehub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sareehub_user');
      }
    }
  }, [user, isLoaded]);

  const login = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Login failed' };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Logged in successfully' };
    } catch {
      return { success: false, message: 'Network error during login' };
    }
  };

  const register = async (name: string, email: string, phone?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Registration failed' };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Account registered successfully' };
    } catch {
      return { success: false, message: 'Network error during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sareehub_user');
  };

  const demoLogin = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'usr-admin-1',
        name: 'SareeHub Admin',
        email: 'admin@sareehub.com',
        phone: '+91 74061 97088',
        role: 'admin',
        savedAddresses: [
          {
            fullName: 'SareeHub Boutique',
            phone: '+91 74061 97088',
            email: 'admin@sareehub.com',
            streetAddress: 'Plot 42, Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500033',
          },
        ],
        createdAt: '2026-01-01T00:00:00Z',
      };
      setUser(adminUser);
    } else {
      const customerUser: UserProfile = {
        id: 'usr-cust-1',
        name: 'Ananya Sharma',
        email: 'ananya@example.com',
        phone: '+91 91234 56789',
        role: 'customer',
        savedAddresses: [
          {
            fullName: 'Ananya Sharma',
            phone: '+91 91234 56789',
            email: 'ananya@example.com',
            streetAddress: 'A-402, Royal Palms Residency, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
          },
        ],
        createdAt: '2026-02-15T10:30:00Z',
      };
      setUser(customerUser);
    }
    setIsAuthModalOpen(false);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
