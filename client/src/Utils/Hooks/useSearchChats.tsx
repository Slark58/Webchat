import { useChat } from '@/Stores/chatStore'
import {useEffect} from 'react'
import { useDebounce } from './useDebounce'


// export const useSearchChats = (chats: string) => {
//   const debounceValue = useDebounce(chats, 500) 
    
//   const getChats = useChat(state => state.getChats)

//     useEffect(() => {
//         getChats(debounceValue)
//     }, [])
    

//     return
// }