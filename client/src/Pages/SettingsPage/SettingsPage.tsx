import React from 'react'

import { Link } from 'react-router-dom'
import { Paths } from '@/App/Routes/types/Paths'
import './SettingsPage.scss'

const SettingsPage = () => {
  return (
    <div className="AccauntPage">
      <h2>Настройки</h2>
      <button>
        <Link to={Paths.Home}>back</Link>
      </button>
    </div>
  )
}

export {SettingsPage}