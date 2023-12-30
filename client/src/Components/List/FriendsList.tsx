import React from 'react';
import { ChatPreview, List } from '..';
import { User } from '@/Stores/userStore';

interface IFriendsAndSearchingListProps {
  searchingFriends: User[];
  friends: User[];
  handleAddFriend: (receiverId: number, senderId: number) => void;
  userId: number;
}

const FriendsAndSearchingList = ({
  friends,
  searchingFriends,
  userId,
  handleAddFriend,
}: IFriendsAndSearchingListProps) => {

  return (
    <List
      data={searchingFriends.length ? searchingFriends : friends}
      mapperData={(item, i: number) => (
        <ChatPreview
          name={item.username}
          render={() =>
            searchingFriends.length ? (
              <button
                onClick={() => handleAddFriend(item.id, userId)}
                className='chatPreview__addBtn'
              >
                +Add
              </button>
            ) : null
          }
          key={i}
        />
      )}
    />
  );
};

export { FriendsAndSearchingList };
