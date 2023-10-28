import React, { useState } from 'react';
import { Burger, List, Menu } from '@/Components';
import { TArr, arr } from '../dataChat';
import ChatPreview from '@/Components/ChatPreview/ChatPreview';

import './Sidebar.scss';



const Sidebar = () => {

  const [visionMenu, setVisionMenu] = useState<boolean>(false)

  const toggleMenu = () => {
    setVisionMenu((visionMenu) => !visionMenu);
  };

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Burger visionMenu={visionMenu} toggleMenu={toggleMenu}/>
      </div>
      <div className='sidebar__wrapper'>
        <List
          data={arr}
          maaperData={(item: TArr, i: number) => (
            <ChatPreview name={item.name} status={item.status} key={i} />
          )}
        />
      </div>

      <Menu isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
