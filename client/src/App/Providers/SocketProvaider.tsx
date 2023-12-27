import { socket } from "@/Services";
import { useAuth } from "@/Stores/userStore";
import { useEffect, createContext, useState, useContext } from "react";
import { Socket, io } from "socket.io-client";


interface SocketProvaiderProps {
    children: JSX.Element
}

type SocketContextType = {
    socket: Socket | null;
    connectSocket: () => void;
  }


export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvaider = ({children}: SocketProvaiderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const setAuth = useAuth((state) => state.setAuth)
    const isAuth = useAuth((state) => state.isAuth)
    
    
    useEffect(() => {
        if (isAuth) {
            connectSocket()
        }
        socket?.on('connect_error', () => {
            setAuth(false)
        })
 
        return () => {
            socket?.off('connect_error')
        }
    }, [setAuth, isAuth, socket])


    const connectSocket = () => {
        if(!socket) {
            const newSocket: Socket = io("http://localhost:5000")
            setSocket(newSocket)
            return
        }
        socket.connect()
      }

    return (
        <SocketContext.Provider value={{socket, connectSocket}}>
            {children}
        </SocketContext.Provider>
    );
};


export const useSocket = () => {
    const context = useContext(SocketContext)
    if(!context) {
        throw new Error('Something went wrong!')
    }
    return context
}