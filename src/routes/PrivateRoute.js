// Brak potrzeby importowania Route czy Navigate w tym pliku
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Zamiast komponentu, PrivateRoute staje się funkcją zwracającą element JSX
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/home" replace />;
};
