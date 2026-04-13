import { Navigate } from 'react-router-dom';

import { TOKEN } from '../pages/Auth/constants/auth-constants.constant';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, redirectTo = '/' }: ProtectedRouteProps) => {
  const token = sessionStorage.getItem(TOKEN) || null;
  if (redirectTo === '/home' && token) return <Navigate to={redirectTo} />;
  if (redirectTo === '/home') return <>{children}</>;
  return token ? <>{children}</> : <Navigate to={redirectTo} />;
};
