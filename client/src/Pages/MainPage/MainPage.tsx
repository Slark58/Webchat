import Sidebar from '@/Layouts/Sidebar/Sidebar'
import { ChatWindowWithSidebar } from '@/Components'
import './MainPage.scss'

const MainPage = () => {

  return (
    <div className='MainPage'>
        {/* <Sidebar/> */}
        <ChatWindowWithSidebar/>
    </div>
  )
}

export {MainPage}