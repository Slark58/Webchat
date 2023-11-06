import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AxiosError, isAxiosError } from "axios";
import { $host } from "@/Services/http/axios";

type AuthErrorType = {
    status: string;
    message: string;
    type: string;
    errors: string[];
  };
  

export type Chat = {
    name: string
} 

interface IChatStore {
    chats: Chat[]
    error: string,
    isLoading: boolean,
    getChats: ({name}: Chat) => void
}



export const useAuth = create<IChatStore>()(devtools(immer((set) => ({
    chats: [],
    error: '',
    isLoading: false,

    getChats: async ({name}) => {
            try {
                set({isLoading: true})
                const {data} = await $host.post<Chat[]>('api/chats', {name})
                set({chats: data})   
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({isLoading: false})
            }
        },
    })
)))

