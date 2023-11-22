import { useEffect, useState } from 'react';
import { Burger, ChatPreview, List, Loader, Menu, SlideSidebar } from '@/Components';
import { Search, X } from 'lucide-react';
import { links } from '@/Components/Menu/data';
import { useDebounce } from '@/Utils/Hooks/useDebounce';
import { useChat } from '@/Stores/chatStore';
import { User } from '@/Stores/userStore';
import { Outlet } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = () => {

  const [visionMenu, setVisionMenu] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const query = useDebounce(value)
  
  const myChats = useChat(state => state.myChats)
  const potentialChats = useChat(state => state.potentialChats)
  const isChatLoading = useChat(state => state.isChatLoading)
  const error = useChat(state => state.error)
  
  const addChat = useChat(state => state.addChat)
  const getChats = useChat(state => state.getChats)
  
  useEffect(() => {
      getChats({query})
  }, [query, getChats])


  const clearInput = () => {
    setValue('');
  };

  const toggleMenu = () => {
    setVisionMenu((visionMenu) => !visionMenu);
  };
  
  return (
    <div className='sidebar'>
      
      <SlideSidebar>
        <Outlet />
      </SlideSidebar>

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
            onClick={clearInput}>
            <X />
          </div>
        </div>
      </div>
      <div className='sidebar__wrapper'>

        {isChatLoading && <Loader/>}

        <List 
          data={potentialChats.length ? potentialChats : myChats}
          mapperData={(item: User, i: number) => (
            <ChatPreview
              name={item.username}
              render={() => (
                potentialChats.length ? (
                  <button onClick={() => addChat(item.id)} className="chatPreview__addBtn">
                    +Add
                  </button>
                ) : null
              )} 
              key={i}
            />
          )}
        />
      </div>
      {value ? error && <div style={{color: "red"}}>{error}</div> : null}
      <Menu data={links} toggleMenu={toggleMenu} isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
