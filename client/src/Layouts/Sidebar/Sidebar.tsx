import { useEffect, useState } from 'react';
import { Burger, ChatPreview, List, Loader, Menu, SlideSidebar } from '@/Components';
import { Search, X } from 'lucide-react';
import { links } from '@/Components/Menu/data';
import { useDebounce } from '@/Utils/Hooks/useDebounce';
import { useChat } from '@/Stores/chatStore';
import { User, useAuth } from '@/Stores/userStore';
import { Outlet } from 'react-router-dom';

import { useFriends } from '@/Stores/friendsStore';
import './Sidebar.scss';
import { useSocket } from '@/App/Providers/SocketProvaider';

const Sidebar = () => {

  const [visionMenu, setVisionMenu] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const query = useDebounce(value)
  const {socket} = useSocket() 

  const setMakeFriendship = useFriends(state => state.setMakeFriendship)
  const searchingFriends = useFriends(state => state.searchingFriends)
  const getFriends = useFriends(state => state.getFriends)
  const searchingError = useFriends(state => state.searchingError)

  const user = useAuth(state => state.user)

  const friends = useFriends(state => state.friends)
  const isfriendLoading = useFriends(state => state.isFriendsLoading)
  const error = useFriends(state => state.friendsError)  
  
  useEffect(() => {
    getFriends({query})
    console.log(socket?.id);
  }, [query, getFriends])

  // const makeFriendHandle = (receiverId: number, senderId: number) => {
  //   socket?.emit('make_friend', {receiverId, senderId})
  //   console.log('aaa');
  // }

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

        {isfriendLoading && <Loader/>}
        <List 
          data={searchingFriends.length ? searchingFriends : friends}
          mapperData={(item: User, i: number) => (
            <ChatPreview
              name={item.username}
              render={() => (
                searchingFriends.length ? (
                  <button onClick={() => setMakeFriendship(item.id, user.id)} className="chatPreview__addBtn">
                    +Add
                  </button>
                ) : null
              )} 
              key={i}
            />
          )}
        />
      </div>
      {value ? searchingError && <div style={{color: "red"}}>{searchingError}</div> : null}
      <Menu data={links} toggleMenu={toggleMenu} isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
