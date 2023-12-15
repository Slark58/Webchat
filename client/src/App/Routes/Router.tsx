import { createBrowserRouter } from 'react-router-dom';
import { Paths } from './types/Paths';
import { AuthGuard } from '../Providers/AuthGuard';
import { AccauntPage, AuthPage, FriendsPage, MainPage, SettingsPage } from '@/Pages';
import { useAuth } from '@/Stores/userStore';
import RequestsPage from '@/Pages/RequestsPage/RequestsPage';

const Router = () => {
  const setChaekAuth = useAuth(state => state.setChaekAuth)
  return createBrowserRouter([
          {
            path: Paths.Login,
            element: <AuthPage />,
          },
          {
            path: Paths.Signup,
            element: <AuthPage />,
          },
          {
            element: <AuthGuard/>,
            loader: async () => {
                const user = await setChaekAuth()
                return user || null
            },
            children: [
                {
                  path: Paths.Home,
                  element: <MainPage/>,
                  children: [
                    {
                      path: Paths.Account,
                      element: <AccauntPage/>
                    },
                    {
                      path: Paths.Friends,
                      element: <FriendsPage/>
                    },
                    {
                      path: Paths.Request,
                      element: <RequestsPage/>
                    },
                    {
                      path: Paths.Settings,
                      element: <SettingsPage/>
                    } 
                  ]
                },
                
            ]
          },
    ]);
} 


export default Router;
