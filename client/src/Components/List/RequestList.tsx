import { User } from '@/Stores/userStore';
import { ChatPreview, List } from '..';

interface IRequestListProps {
  data: User[];
  renderBtn: (item: User) => JSX.Element;
}

const RequestList = ({
  data,
  renderBtn
}: IRequestListProps) => {
  return (
    <List
      data={data}
      mapperData={(item, i) => (
        <ChatPreview
          name={item.username}
          render={() => renderBtn(item)}
          key={i}
        />
      )}
    />

    
  );
};

export { RequestList };
