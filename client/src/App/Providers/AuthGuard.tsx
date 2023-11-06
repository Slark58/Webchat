import {useEffect, ReactNode, type ReactElement, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { IGuardProps } from './types/IGuardProps';
import { Paths } from '../Routes/types/Paths';
import { useAuth } from '@/Stores/userStore';


const AuthGuard = () => {
    const isAuth = useAuth(state => state.isAuth)
    const isLoading = useAuth(state => state.isLoading)
      if (isLoading) {
        return <div>loading...</div>
      } 
      if (isAuth) {
        return <Outlet/>
      } else {
        return <Navigate to={Paths.Signup}/>
      }
      
};

export { AuthGuard };
