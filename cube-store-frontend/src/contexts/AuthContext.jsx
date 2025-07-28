/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch {
        // token inválido, bórralo
        localStorage.removeItem('token');
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    const { token } = data;
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ ...decoded, token });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
