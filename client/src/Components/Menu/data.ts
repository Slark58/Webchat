import { ReactNode } from "react";
import { Paths } from "@/App/Routes/types/Paths";

export type TLink = {
    path: string,
    icon: ReactNode,
    label: string,
}

export const links: TLink[] = [
    {
        path: Paths.Home, 
        label: 'Настройки', 
        icon: <UserCircle />,
    },
    {
        path: Paths.Home, 
        label: 'Аккаунт', 
        icon: <Settings />
    },
    {
        path: Paths.Home, 
        label: 'Лупень', 
        icon: <UserCircle />
    },
]