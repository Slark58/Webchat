import { ReactNode } from "react";
import { Paths } from "@/App/Routes/types/Paths";
import { Settings, UserCircle } from "lucide-react";

export type TLink = {
    path: string,
    label: string,
    icon: ReactNode,
}

export const links: TLink[] = [
    {
        path: Paths.Home, 
        label: 'Аккаунт', 
        icon: <UserCircle  className="menu__icon-img" />,
    },
    {
        path: Paths.Home, 
        label: 'Настройки', 
        icon: <Settings className="menu__icon-img"/>
    },

]