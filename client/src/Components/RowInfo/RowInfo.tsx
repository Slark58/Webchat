import { ReactNode } from "react";

import './RowInfo.scss'

export interface RowInfoProps {
    title?: string
    subtitle?: string
    icon: ReactNode
}

const RowInfo = ({subtitle, title, icon}: RowInfoProps) => {
  return (
    <div className="row__info">
        <div className="row__info-icon">{icon}</div>
        <div className="row__info-wrap">
            <div className="row__info-title">{title}</div>
            {subtitle && <div className="row__info-subtitle">{subtitle}</div>}
        </div>
    </div>
  )
};

export {RowInfo};