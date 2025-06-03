
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'professor' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Emily Carter',
    email: 'emily.carter@university.edu',
    role: 'admin',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Prof. David Chen',
    email: 'david.chen@university.edu',
    role: 'professor',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Dr. Sarah Lee',
    email: 'sarah.lee@university.edu',
    role: 'professor',
    status: 'approved'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && foundUser.status === 'approved') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    if (foundUser && foundUser.status === 'pending') {
      throw new Error('Su cuenta está pendiente de aprobación por el administrador');
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'professor',
      status: 'pending'
    };
    
    mockUsers.push(newUser);
    return true;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
