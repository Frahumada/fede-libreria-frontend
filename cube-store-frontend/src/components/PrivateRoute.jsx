// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ roles }) {
  const { user, isAuthenticated, loadingAuth } = useAuth();

  // Mientras cargamos el token, no redirijas
  if (loadingAuth) return null;

  // Si no estás logueado, al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si tienes roles y el tuyo no está en la lista, al dashboard
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  // Si todo OK, renderiza las rutas hijas
  return <Outlet />;
}
