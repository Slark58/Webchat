import React, { FC } from 'react'

import './Menu.scss'

type TMenu = {
    isOpen: boolean
}

const Menu: FC<TMenu> = ({isOpen}) => {
    
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div>Menu</div>
        <div>Menu</div>
        <div>Menu</div>
        <div>Menu</div>
    </div>
  )
}

export {Menu}