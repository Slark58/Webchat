import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Burger, ChatPreview, FriendsAndSearchingList, List, Loader, Menu, SlideSidebar } from '@/Components';
import { Search, X } from 'lucide-react';
import { links } from '@/Components/Menu/data';
import { useDebounce } from '@/Utils/Hooks/useDebounce';
import { useChat } from '@/Stores/chatStore';
import { User, useAuth } from '@/Stores/userStore';
import { Outlet } from 'react-router-dom';

import { useFriends } from '@/Stores/friendsStore';
import './Sidebar.scss';
import { useSocket } from '@/App/Providers/SocketProvaider';
import {SideBarHeader} from '../Header/SideBarHeader/SideBarHeader';

const Sidebar = () => {

  const [visionMenu, setVisionMenu] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  // const [count, setCount] = useState<number>(0);
  const query = useDebounce(value)
  const {socket} = useSocket() 

  const setMakeFriendship = useFriends(state => state.setMakeFriendship)
  const searchingFriends = useFriends(state => state.searchingFriends)
  const getSearchingFriends = useFriends(state => state.getSearchingFriends)
  const searchingError = useFriends(state => state.searchingError)

  const userId = useAuth(state => state.user.id)

  const friends = useFriends(state => state.friends)
  const getMyFriends = useFriends(state => state.getMyFriends)
  const isfriendLoading = useFriends(state => state.isFriendsLoading)
  const error = useFriends(state => state.friendsError)  
  
  useEffect(() => {
    getSearchingFriends(query)
    // console.log(socket?.id);
  }, [query, getSearchingFriends])
  
  useEffect(() => {
    getMyFriends(userId)
  }, [])

  // const makeFriendHandle = (receiverId: number, senderId: number) => {
  //   socket?.emit('make_friend', {receiverId, senderId})
  //   console.log('aaa');
  // }

  const handleAddFriend = (receiverId: number, senderId: number) => {
    setMakeFriendship(receiverId, senderId)
  }

  const clearInput = useCallback(() => {
    setValue('');
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  
  const toggleMenu = useCallback(() => {
    setVisionMenu((visionMenu) => !visionMenu);
  }, []);
  
  return (
    <div className='sidebar'>
      
      {/* <button onClick={() => setCount(state => state += 1)}>{count}</button> */}
      
      <SlideSidebar>
        <Outlet />
      </SlideSidebar>

      <SideBarHeader
        value={value}
        visionMenu={visionMenu}
        clearInput={clearInput}
        handleChange={handleChange}
        toggleMenu={toggleMenu}
      />
      <div className='sidebar__wrapper'>
        {isfriendLoading && <Loader/>}
        <FriendsAndSearchingList
          friends={friends}
          searchingFriends={searchingFriends}
          handleAddFriend={handleAddFriend}
          userId={userId}
          />
      </div>
      {value ? searchingError && <div style={{color: "red"}}>{searchingError}</div> : null}
      <Menu data={links} toggleMenu={toggleMenu} isOpen={visionMenu} />
    </div>
  );
};

export default Sidebar;
