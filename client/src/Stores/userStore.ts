import { FormValues } from "@/Components/AuthForm/AuthForm";
import { $host } from "@/Services/http";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import jwt_decode  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";


type AuthErrorType = {
    status: string;
    message: string;
    type: string;
    errors: string[];
  };
  

type User = {
    username?: string,
    email: string,
    password: string
} 

interface IAuthStore {
    isAuth: boolean,
    user: User,
    error: string,
    isLoading: boolean,
    setRegister: ({email, password, username}: FormValues) => Promise<string | undefined>,
    setLogin: ({email, password}: FormValues) => Promise<string | undefined>,
}


export const useAuth = create<IAuthStore>()(devtools(persist(immer((set) => ({
    isAuth: false,
    user: {} as User,
    error: '',
    isLoading: false,

    setRegister: async ({email, password, username}) => {
            try {
                set({isLoading: true})
                const {data} = await $host.post('api/user/registration', {email, password, username})
                const user = await jwt_decode<User>(data.token)
                set({user: user})
                return user.username;
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
            const user = await jwt_decode<User>(data.token)
            set({user: user, isAuth: true})
            return user.email
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({isLoading: false})
            setTimeout(() => set({error: ''}), 5000)
        }
    }

})),{name: 'AuthStore', version: 1})))