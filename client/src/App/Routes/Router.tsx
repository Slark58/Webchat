import { createBrowserRouter } from 'react-router-dom';
import { Paths } from './types/Paths';
import { AuthGuard } from '../Providers/AuthGuard';
import { AuthPage, MainPage } from '@/Pages';

const Router = createBrowserRouter([
        {
          path: Paths.Login,
          element: <AuthPage />,
        },
        {
          path: Paths.Signup,
          element: <AuthPage />,
        },
        {
          path: Paths.Home,
          element:  <AuthGuard>
                      <MainPage />
                    </AuthGuard>
        },
  ]);

export default Router;
