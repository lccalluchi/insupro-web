import { Navigate } from 'react-router-dom';
import { useInsumoProAuth } from '../../context/insumopro-auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function InsumoProProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useInsumoProAuth();

  if (!isAuthenticated) {
    return <Navigate to="/insumopro/login" replace />;
  }

  return <>{children}</>;
}
