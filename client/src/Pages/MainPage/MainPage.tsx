import React, { useEffect } from 'react'
import Sidebar from '@/Layouts/Sidebar/Sidebar'
import './MainPage.scss'
import { useSocket } from '@/Utils'

const MainPage = () => {

  useSocket()

  return (
    <div className='MainPage'>
        <Sidebar/>
    </div>
  )
}

export {MainPage}