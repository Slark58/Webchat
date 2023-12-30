import {
  ChatPreview,
  Label,
  LabelsList,
  List,
  PageHeader,
  RequestList,
} from '@/Components';
import { User, useAuth } from '@/Stores/userStore';
import { useFriends } from '@/Stores/friendsStore';
import './RequestsPage.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { links } from './links';

export type TabType = 'incoming' | 'outgoing';

const RequestsPage = () => {
  const userId = useAuth((state) => state.user.id);

  const potentialFriends = useFriends((state) => state.potentialFriends);

  const wannaBeFriends = useFriends((state) => state.wannaBeFriends);
  const getFriendshipWannabes = useFriends((state) => state.getFriendshipWannabes);
  const getPotentialFriendship = useFriends((state) => state.getPotentialFriendship);

  const acceptFriendship = useFriends((state) => state.acceptFriendship);
  const rejectFriendship = useFriends((state) => state.rejectFriendship);

  const [activeTab, setActiveTab] = useState<TabType>('incoming');

  // useEffect(() => {
  //   socket?.on('friend_added', (friend) => {
  //     setSocketPotentialFriends(friend)
  //     console.log('Friend request received:', { friend});
  //   })
  //   socket?.on('friend_request_received', (me) => {
  //     console.log('me', me);
  //     setSocketWannaBeFriends(me)
  //   })
  //   console.log(socket?.id);

  //   // return () => {
  //   //   socket?.disconnect(); // Отключение сокета при размонтировании компонента
  //   // };
  // }, [socket]);

  useEffect(() => {
    if (activeTab === 'incoming') {
      getFriendshipWannabes(userId);
    } else {
      getPotentialFriendship(userId);
    }
  }, [activeTab]);

  
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.value as TabType);
  };

  return (
    <div className='requestsPage'>
      <div className='requestsPage__wrapper'>
        <PageHeader name='Заявки' />
        <div className='requestsPage__tabs'>
          <LabelsList   
            data={links}  
            activeTab={activeTab}  
            handleChange={handleChange} />
        </div>
        {activeTab === 'incoming' ? (
          wannaBeFriends.length ? (
            <RequestList
              data={wannaBeFriends}
              renderBtn={(item: User) => (
                <div className="flex-choice">
                  <button onClick={() => acceptFriendship(userId, item.id)} className='requestsPage__accept'>
                    Принять
                  </button>
                  <button onClick={() => rejectFriendship(item.id, userId)} className='requestsPage__cancel'>
                    Отклонить
                  </button>
              </div>
              )}
            />
          ) : (
            <div className='friendsPage__empty'>Заявок нет D:</div>
          )
        ) : potentialFriends.length ? (
          <RequestList
            data={potentialFriends}
            renderBtn={(item: User) => (
              <button onClick={() => rejectFriendship(userId, item.id)} className='requestsPage__cancel'>
                Отменить заявку
              </button>
            )}
          />
        ) : (
          <div className='friendsPage__empty'>Заявок нет D:</div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
