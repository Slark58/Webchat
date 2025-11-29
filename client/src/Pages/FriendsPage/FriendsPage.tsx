import { useState } from 'react';
import { ChatPreview, List } from '@/Components';
import { User } from '@/Stores/userStore';
import { PageHeader } from '@/Components';

import './FriendsPage.scss'
import { useFriends } from '@/Stores/friendsStore';

const FriendsPage = () => {

  // const [friendsList, setFriendsList] = useState([]);

  const friends = useFriends(state => state.friends)

  console.log(friends);
  

  return (
    <div className="friendsPage">
      <div className="friendsPage__wrapper">
        <PageHeader name='Друзья'/>
        {friends ? 
        <List
        data={friends}
        mapperData={(item: User, i) => (<ChatPreview key={i} name={item.username}/>)}
        /> : 
          <div className="friendsPage__empty">
            У вас нет друзей! D:
          </div>
        }
        </div>
    </div>
  );
};

export {FriendsPage}