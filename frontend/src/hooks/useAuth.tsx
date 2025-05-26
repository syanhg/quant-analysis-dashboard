import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your backend API
      // const response = await api.post('/api/auth/login', { email, password });
      
      // For demo purposes, mock successful login
      const mockResponse = {
        user: {
          id: '1',
          name: 'Demo User',
          email: email,
          avatar: 'https://via.placeholder.com/40',
        },
        token: 'mock-jwt-token',
      };
      
      setUser(mockResponse.user);
      setToken(mockResponse.token);
      
      // Set token for API calls
      api.defaults.headers.common['Authorization'] = `Bearer ${mockResponse.token}`;
      
      // Store in localStorage
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your backend API
      // const response = await api.post('/api/auth/register', { name, email, password });
      
      // For demo purposes, mock successful registration
      const mockResponse = {
        user: {
          id: '1',
          name: name,
          email: email,
          avatar: 'https://via.placeholder.com/40',
        },
        token: 'mock-jwt-token',
      };
      
      setUser(mockResponse.user);
      setToken(mockResponse.token);
      
      // Set token for API calls
      api.defaults.headers.common['Authorization'] = `Bearer ${mockResponse.token}`;
      
      // Store in localStorage
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
