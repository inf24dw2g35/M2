// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/autenticado')
      .then(response => {
        if (response.data?.user) {
          setUser(response.data.user);
          setIsLogged(true);
        }
      })
      .catch(() => {
        setUser(null);
        setIsLogged(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    user,
    isLogged,
    loading,
    setUser,
    setIsLogged
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}