import { List, PageHeader, RowInfo } from '@/Components';
import { RowInfoProps } from '@/Components/RowInfo/RowInfo';
import { useAuth } from '@/Stores/userStore';
import { AtSign, User2 } from 'lucide-react';
import './AccauntPage.scss'
import { dataAccountLink } from '@/Utils/Data/dataAccountLink';


const AccauntPage = () => {

  const user = useAuth(state => state.user)
  
  return (
    <div className="AccauntPage">
      <div className="AccauntPage__wrapper">
        <PageHeader name="Аккаунт"/>
        <div className="AccauntPage__info">
          <RowInfo 
                title={user.email} 
                subtitle='Email' 
                icon={<AtSign/>}/>
          <RowInfo 
                title={user.username} 
                subtitle='Имя пользователя' 
                icon={<User2/>}/>
        </div>
        {/* <List 
          data={dataAccountLink} 
          mapperData={(item: RowInfoProps) => 
            <RowInfo 
              title={user.} 
              subtitle={item.subtitle} 
              icon={item.icon}/>}/> */}
      </div>
    </div>
  )
};

export {AccauntPage};