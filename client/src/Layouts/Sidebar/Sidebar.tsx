import React, { useState } from 'react';
import { Burger, List, Menu } from '@/Components';
import { TArr, arr } from '../dataChat';
import ChatPreview from '@/Components/ChatPreview/ChatPreview';
import { Search } from 'lucide-react';
import './Sidebar.scss';
import { links } from '@/Components/Menu/data';


const Sidebar = () => {

  const [visionMenu, setVisionMenu] = useState<boolean>(false)

  const toggleMenu = () => {
    setVisionMenu((visionMenu) => !visionMenu);
  };

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Burger visionMenu={visionMenu} toggleMenu={toggleMenu}/>
        <div className="sidebar__header-search">
          <input type="text" className='sidebar__header-search-input' />
          <Search className='search-icon' />
        </div>
      </div>
      <div className='sidebar__wrapper'>
        <List
          data={arr}
          maaperData={(item: TArr, i: number) => (
            <ChatPreview name={item.name} status={item.status} key={i} />
          )}
        />
      </div>

      <Menu data={links} isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
