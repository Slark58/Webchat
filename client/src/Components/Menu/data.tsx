import { ReactNode } from "react";
import { Paths } from "@/App/Routes/types/Paths";
import { MailQuestion, Settings, UserCircle, Users2 } from "lucide-react";

export type TLink = {
    path: string,
    label: string,
    icon: ReactNode,
}

export const links: TLink[] = [
    {
        path: Paths.Account, 
        label: 'Аккаунт', 
        icon: <UserCircle  className="menu__icon-img" />,
    },
    {
        path: Paths.Friends,
        label: 'Друзья', 
        icon: <Users2  className="menu__icon-img" />,
    },
    {
        path: Paths.Request,
        label: 'Заявки', 
        icon: <MailQuestion  className="menu__icon-img" />,
    },
    {
        path: Paths.Settings, 
        label: 'Настройки', 
        icon: <Settings className="menu__icon-img"/>
    },

]