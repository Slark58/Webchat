import React, { useState } from 'react';
import { Burger, List, Menu } from '@/Components';
import { TArr, arr, arr2 } from '../dataChat';
import ChatPreview from '@/Components/ChatPreview/ChatPreview';
import { Search, X } from 'lucide-react';
import { links } from '@/Components/Menu/data';
import './Sidebar.scss';

const Sidebar = () => {
  const [visionMenu, setVisionMenu] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const clearInput = () => {
    setValue('');
  };

  const toggleMenu = () => {
    setVisionMenu((visionMenu) => !visionMenu);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Burger visionMenu={visionMenu} toggleMenu={toggleMenu} />
        <div className='sidebar__header-search'>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='sidebar__header-search-input'
          />
          <Search className='search-icon' />
          <div
            className={value ? 'close-btn' : 'close-btn-none'}
            onClick={clearInput}
          >
            <X />
          </div>
        </div>
      </div>
      <div className='sidebar__wrapper'>
        {value ? (
          <List
            data={arr2}
            mapperData={(item: TArr, i: number) => (
              <ChatPreview 
                name={item.name} 
                status={item.status} 
                render={() => (<button className='chatPreview__addBtn'>add chat</button>)}
                key={i} />
            )}
          />
        ) : (
          <List
            data={arr}
            mapperData={(item: TArr, i: number) => (
              <ChatPreview 
              name={item.name} 
              status={item.status}
              render={() => (<div className={`chatPreview__status  ${item.status ? 'status-online' : 'status-offline'}`}></div>)}
              key={i} />
            )}
          />
        )}
        {/* <List
          data={arr}
          mapperData={(item: TArr, i: number) => (
            <ChatPreview name={item.name} status={item.status} key={i} />
          )}
        /> */}
      </div>

      <Menu data={links} toggleMenu={toggleMenu} isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
