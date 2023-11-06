import { FormValues } from "@/Components/AuthForm/AuthForm";
import { $authHost, $host } from "@/Services/http/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import jwt_decode  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";

type AuthErrorType = {
    status: string;
    message: string;
    type: string;
    errors: string[];
  };
  

export type User = {
    username?: string,
    email: string,
    password: string
} 

interface IAuthStore {
    isAuth: boolean,
    user: User,
    error: string,
    isLoading: boolean,
    setAuth: (bool: boolean) => void,
    setUser: (user: User | undefined) => void,
    setRegister: ({email, password, username}: FormValues) => Promise<User | undefined>,
    setLogin: ({email, password}: FormValues) => Promise<User | undefined>,
    setLoguot: () => void,
    setChaekAuth: () =>  Promise<User | undefined>,
}



export const useAuth = create<IAuthStore>()(devtools(immer((set) => ({
    isAuth: false,
    user: {} as User,
    error: '',
    isLoading: false,

    setAuth: (bool) => set({isAuth: bool}),
    setUser: (user) => set({user: user, isAuth: true}),
    

    setRegister: async ({email, password, username}) => {
            try {
                set({isLoading: true})
                const {data} = await $host.post('api/user/registration', {email, password, username})
                localStorage.setItem('token', data.token)
                const user = jwt_decode<User>(data.token)
                set({user: user})   
                return user;
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({isLoading: false})
                setTimeout(() => set({error: ''}), 5000)
            }
    },

    setLogin: async ({email, password}) => {
        try {
            set({isLoading: true})
            const {data} = await $host.post('api/user/login', {email, password})
            localStorage.setItem('token', data.token)
            const user = jwt_decode<User>(data.token)
            set({user: user, isAuth: true})
            return user
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({isLoading: false})
            setTimeout(() => set({error: ''}), 5000)
        }
    },

    setChaekAuth: async () => {
        set({isLoading: true})
        try {
            const {data} = await $authHost.get('api/user/auth')
            localStorage.setItem('token', data.token)
            const user = jwt_decode<User>(data.token)
            set({user: user, isAuth: true})
            return user
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({isLoading: false})
            setTimeout(() => set({error: ''}), 5000)
        }
    },

    setLoguot: async () => {
        set({isLoading: true})
        try {
            localStorage.removeItem('token')
            set({user: {} as User, isAuth: false})
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({isLoading: false})
            setTimeout(() => set({error: ''}), 5000)
        }
    },
    })
)))

