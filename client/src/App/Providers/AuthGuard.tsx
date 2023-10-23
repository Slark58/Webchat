import { Navigate } from 'react-router-dom';
import { IGuardProps } from './types/IGuardProps';
import { Paths } from '../Routes/types/Paths';
import { useAuth } from '@/Stores/userStore';

const AuthGuard = ({ children }: IGuardProps) => {
  const isAuthorized = useAuth(state => state.isAuth)

  if (!isAuthorized) return <Navigate to={Paths.Signup} />

  return children;
};

export { AuthGuard };
