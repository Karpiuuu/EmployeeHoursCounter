import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [remainingTime, setRemainingTime] = useState(1800000); // 30 minut w ms - 1800000


  const resetTimer = () => {
    setRemainingTime(1800000);
  };


  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, remainingTime, resetTimer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
