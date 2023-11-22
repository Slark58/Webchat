import { AtSign, User2 } from "lucide-react"
import { ReactNode } from "react"


export interface IdataAccountLink {
    title?: string
    subtitle?: string
    icon: ReactNode
}


export const dataAccountLink: IdataAccountLink[] = [
    {
        subtitle: 'Email',
        icon: <AtSign/>,
    },
    {
        subtitle: 'Имя пользователя',
        icon: <User2 />,
    },
]