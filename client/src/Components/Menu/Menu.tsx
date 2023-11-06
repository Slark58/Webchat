import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { TLink } from './data'
import { List } from '..'
import './Menu.scss'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/Stores/userStore'

type TMenu = {
    isOpen: boolean
    data: TLink[]
    toggleMenu: () => void
}

const Menu: FC<TMenu> = ({isOpen, data, toggleMenu}) => {
  
  const setLoguot = useAuth(state => state.setLoguot)

  return (
    <div className={`menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu} >
      <div className="menu__content">
          <List 
            data={data} 
            mapperData={(data: TLink) => (
              <Link className='menu__link' to={data.path}>
                <div className="menu__icon">{data.icon}</div>
                <div className="menu__label">{data.label}</div>
              </Link>
            )}/>
            <button className='logout-btn' onClick={setLoguot}>
              <LogOut className="menu__icon-img" />
              Выйти
            </button>
      </div>
    </div>
  )
}

export {Menu}