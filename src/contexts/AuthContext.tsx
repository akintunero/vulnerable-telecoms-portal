import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { email, password });
    if (email === 'admin@telco.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@telco.com',
        role: 'Administrator',
        avatar: 'https://i.pravatar.cc/150?img=1'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('last_login', new Date().toISOString());
      console.log('Login successful, redirecting to dashboard...');
      navigate('/dashboard');
      return true;
    }
    if (email === 'sys@telco.com' && password === 'sysaccess') {
      const sysUser: User = {
        id: '2',
        name: 'System User',
        email: 'sys@telco.com',
        role: 'System',
        avatar: 'https://i.pravatar.cc/150?img=2'
      };
      setUser(sysUser);
      localStorage.setItem('user', JSON.stringify(sysUser));
      localStorage.setItem('last_login', new Date().toISOString());
      console.log('Login successful, redirecting to dashboard...');
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    console.log('Logging out');
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  console.log('AuthContext state:', { user, isAuthenticated: !!user, isLoading });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
