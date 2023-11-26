import Sidebar from '@/Layouts/Sidebar/Sidebar'
import { useSocket } from '@/Utils'
import './MainPage.scss'
import { SlideSidebar } from '@/Components'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const MainPage = () => {

  useSocket()

  return (
    <div className='MainPage'>
        <Sidebar/>
    </div>
  )
}

export {MainPage}