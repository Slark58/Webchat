import { useState } from 'react';
import { ChatPreview, List } from '@/Components';
import { User } from '@/Stores/userStore';
import { PageHeader } from '@/Components';

import './FriendsPage.scss'

const FriendsPage = () => {

  const [friendsList, setFriendsList] = useState([]);

  return (
    <div className="friendsPage">
      <div className="friendsPage__wrapper">
        <PageHeader name='Друзья'/>
        {friendsList.length ? 
        <List
        data={friendsList}
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