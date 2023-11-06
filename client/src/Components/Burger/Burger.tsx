import { FC } from 'react'

import './Burger.scss'

export type TBurger = {
    visionMenu: boolean
    toggleMenu: () => void
}

const Burger: FC<TBurger> = ({visionMenu, toggleMenu}) => {
  return (
    <div className={visionMenu ? "burger open" : "burger"} onClick={toggleMenu}>
        <span className="burger__bar"></span>
        <span className="burger__bar"></span>
        <span className="burger__bar"></span>
    </div>
  )
}

export {Burger}