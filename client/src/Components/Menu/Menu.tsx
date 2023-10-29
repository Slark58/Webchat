import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { TLink } from './data'
import { List } from '..'
import './Menu.scss'

type TMenu = {
    isOpen: boolean
    data: TLink[]
}

const Menu: FC<TMenu> = ({isOpen, data}) => {
    
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
        <List 
          data={data} 
          maaperData={(data: TLink) => (
            <Link to={data.path}>
              <div className=""></div>
              <div className="menu__link">{data.label}</div>
            </Link>
          )}/>
    </div>
  )
}

export {Menu}