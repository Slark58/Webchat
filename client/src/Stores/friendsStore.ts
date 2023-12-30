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
    getMyFriends: (userId: number) => void

    wannaBeFriends: User[]
    wannaBeFriendsError: string
    isWannaBeFriendsLoading: boolean
    // setSocketWannaBeFriends:(user: User) => void
    getFriendshipWannabes: (query: number) => void

    potentialFriends: User[]
    potentialFriendsError: string
    isPotentialFriendsLoading: boolean
    // setSocketPotentialFriends: (user: User) => void,
    setMakeFriendship: (receiverId: number, senderId: number) => void
    getPotentialFriendship: (query: number) => void


    searchingFriends: User[]
    searchingError: string
    isSearchingLoading: boolean
    getSearchingFriends: (query: string ) => void

    isAcceptFriendshipLoading: boolean,
    acceptFriendshipError: string,
    acceptFriendship: (receiverId: number, senderId: number) => void

    isRejectFriendshipLoading: boolean,
    rejectFriendshipError: string,
    rejectFriendship: (senderId: number, receiverId: number) => void
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

    isAcceptFriendshipLoading: false,
    acceptFriendshipError: '',
    isRejectFriendshipLoading: false,
    rejectFriendshipError: '',

    // setSocketPotentialFriends: (user) => {
    //     set(state => state.potentialFriends.push(user))
    // },
    // setSocketWannaBeFriends: (user) => {
    //     set(state => state.potentialFriends.push(user))
    // },

    getMyFriends: async (userId) => {
        set({isFriendsLoading: true})
        try {
            const {data} = await $host.get<ICandidates>(`api/friend/all?userId=${userId}`)
            console.log(data);
            set({friends: data.candidates})
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({searchingError: err.response?.data.message})
            }
        } finally {
            set({isFriendsLoading: false})
        }
    },

    getSearchingFriends: async (query) => {
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
            const {data} = await $host.get<ICandidates>(`api/friend/getRequestIncomming?receiverId=${receiverId}`)
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
    },
    getPotentialFriendship: async (senderId) => {
        set({isPotentialFriendsLoading: true})
        try {
            const {data} = await $host.get<ICandidates>(`api/friend/getRequestOutcomming?senderId=${senderId}`)
            console.log(data);
            set({potentialFriends: data.candidates});
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

    acceptFriendship: async (receiverId, senderId) => {
        set({isAcceptFriendshipLoading: true})
        try {
            const {data} = await $host.post<{message: string}>(`api/friend/accept`, {receiverId, senderId})
            if (data) {
                set((state) => {
                    state.wannaBeFriends = state.wannaBeFriends.filter(friend => friend.id !== senderId)
                });
            }
            console.log('accept:', data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({acceptFriendshipError: err.response?.data.message})
            }
        } finally {
            set({isAcceptFriendshipLoading: false})
        }
    },
    rejectFriendship: async (senderId, receiverId) => {
        set({isRejectFriendshipLoading: true})
        try {
            const {data} = await $host.post(`api/friend/reject`, {senderId, receiverId})
            console.log('reject:', data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({acceptFriendshipError: err.response?.data.message})
            }
        } finally {
            set({isRejectFriendshipLoading: false})
        }
    },


}))), {name: 'storeFriends', version: 1}))