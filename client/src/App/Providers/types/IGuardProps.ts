import { ReactNode, type ReactElement } from 'react'

export type IGuardProps = {
    children?: ReactNode
    isAuth?: boolean
    path?: string
}