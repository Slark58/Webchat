import React from 'react'

import './ChatWindowWithSidebar.scss'
import ChatWindow from '../ChatWindow/ChatWindow'
import Sidebar from '@/Layouts/Sidebar/Sidebar'

const ChatWindowWithSidebar = () => {
  return (
    <div className='cwws'>
        <Sidebar/>
        <ChatWindow/>
    </div>
  )
}

export {ChatWindowWithSidebar}