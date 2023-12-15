import { $host } from "@/Services/http/axios"
import { AuthErrorType } from "@/Utils/Types/types"
import { AxiosError, isAxiosError } from "axios"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { User } from "./userStore"

export interface IFriends {
    id: number
    senderId: number
    receiverId: number
    accepted: boolean
}

export interface ICandidates {
    candidates: User[]
} 

// interface ISearchFriends {
//     searchingFriends: User[]
//     searchingError: string
//     isSearchingLoading: boolean
//     getFriends: ({query}: {query: string} ) => void
// }
// interface IPotentialFriends {
//     potentialFriends: User[]
//     potentialFriendsError: string
//     isPotentialFriendsLoading: boolean
//     setMakeFriendship: (receiverId: number, senderId: number) => void
// }
// interface IWannaBeFriends {
//     wannaBeFriends: User[]
//     wannaBeFriendsError: string
//     isWannaBeFriendsLoading: boolean
//     getFriendshipWannabes: (id: number) => void
// }

// type IStore = ISearchFriends | IPotentialFriends | IWannaBeFriends | IFriendsStore

interface IFriendsStore {
    friends: User[]
    friendsError: string,
    isFriendsLoading: boolean,

    wannaBeFriends: User[]
    wannaBeFriendsError: string
    isWannaBeFriendsLoading: boolean
    getFriendshipWannabes: (query: number) => void

    potentialFriends: User[]
    potentialFriendsError: string
    isPotentialFriendsLoading: boolean
    setMakeFriendship: (receiverId: number, senderId: number) => void

    searchingFriends: User[]
    searchingError: string
    isSearchingLoading: boolean
    getFriends: ({query}: {query: string} ) => void

}


export const useFriends = create<IFriendsStore>()(persist(devtools(immer((set) => ({
    friends: [],
    friendsError: '',
    isFriendsLoading: false,

    wannaBeFriends: [],
    wannaBeFriendsError: '',
    isWannaBeFriendsLoading: false,

    potentialFriends: [],
    potentialFriendsError: '',
    isPotentialFriendsLoading: false,

    searchingFriends: [],
    searchingError: '',
    isSearchingLoading: false,

    getFriends: async ({query}) => {
        if (!query) {
            set({searchingFriends: []})
            return
        }
        try {
            set({isSearchingLoading: true})
            const {data} = await $host.get<ICandidates>(`api/friend/search?username=${query}`)
            set({searchingFriends: data.candidates})  
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({searchingError: err.response?.data.message})
            }
        } finally {
            set({isSearchingLoading: false})
            setTimeout(() => set({searchingError: ''}), 2000)
        }
    },
    setMakeFriendship: async (receiverId, senderId) => {
        set({isPotentialFriendsLoading: true})
        try {
            const {data} = await $host.post<User>('api/friend/add', {receiverId, senderId})
            set((state) => {
                state.potentialFriends.push(data);
                console.log(data);
            });
            console.log(data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({potentialFriendsError: err.response?.data.message})
            }
        } finally {
            set({isPotentialFriendsLoading: false})
        }
    },

    getFriendshipWannabes: async (receiverId) => {
        set({isWannaBeFriendsLoading: true})
        try {
            const {data} = await $host.get<ICandidates>(`api/friend/getfriendship?receiverId=${receiverId}`)
            set({wannaBeFriends: data.candidates});
            console.log(data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({wannaBeFriendsError: err.response?.data.message})
            }
        } finally {
            set({isWannaBeFriendsLoading: false})
        }
    }
}))), {name: 'storeFriends', version: 1}))