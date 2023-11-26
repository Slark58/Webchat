import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AxiosError, isAxiosError } from "axios";
import { $host } from "@/Services/http/axios";
import { User } from "./userStore";
import { AuthErrorType } from "@/Utils/Types/types";


  
export type Query = {
      query: string
  } 
export type Chat = {
      query?: string | number
      candidates: User[]
  } 

interface IChatStore {
    myChats: User[],
    potentialChats:  User[],
    error: string,
    isChatLoading: boolean,
    getChats: ({query}: Query ) => void
    addChat: (id: number) => void
    setMakeFriendship: (receiverId: number, senderId: number) => void
}



export const useChat = create<IChatStore>()(devtools(immer((set) => ({
    myChats: [],
    potentialChats: [],
    error: '',
    isChatLoading: false,

    getChats: async ({query}) => {
            if (!query) {
                set({potentialChats: []})
                return
            }
            try {
                set({isChatLoading: true})
                const {data} = await $host.get<Chat>(`api/chat/search?username=${query}`)
                set({potentialChats: data.candidates})  
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({isChatLoading: false})
                setTimeout(() => set({error: ''}), 2000)
            }
        },

    addChat: async (id: number) => {
            try {
                set({isChatLoading: true})
                const {data} = await $host.post('api/chat/addchat', {id})
                console.log(data);
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({isChatLoading: false})
                setTimeout(() => set({error: ''}), 2000)
            }
        },


        setMakeFriendship: async (receiverId, senderId) => {
            set({isChatLoading: true})
            try {
                const {data} = await $host.post('api/chat/friend', {receiverId, senderId})
                console.log(data)
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({isChatLoading: false})
            }
        }
    })
)))

