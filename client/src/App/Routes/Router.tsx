import { useEffect, useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Paths } from './types/Paths';
import { AuthGuard } from '../Providers/AuthGuard';
import { AuthPage, MainPage } from '@/Pages';
import { useAuth } from '@/Stores/userStore';


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
                }
            ]
          },
    ]);
} 


export default Router;
