import {useEffect} from 'react'
import { socket } from '@/Services'
import { useAuth } from '@/Stores/userStore'

export const useSocket = () => {

    const setAuth = useAuth((state) => state.setAuth)
    const isAuth = useAuth((state) => state.isAuth)
    
    
    useEffect(() => {
        if (isAuth) {
            socket.connect() 
        }
        socket.on('connect_error', () => {
            setAuth(false)
        })

        return () => {
            socket.off('connect_error')
        }
    }, [setAuth, isAuth])
    
}