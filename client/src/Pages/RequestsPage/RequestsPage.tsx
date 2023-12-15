import { ChatPreview, Label, List, PageHeader } from "@/Components";
import { User, useAuth } from "@/Stores/userStore";
import { useFriends } from "@/Stores/friendsStore";
import './RequestsPage.scss'
import { ChangeEvent, useEffect, useState } from "react";
import { links } from "./links";

export type TabType = "incoming" | "outgoing";

const RequestsPage = () => {
  const userId = useAuth(state => state.user.id)

  const potentialFriends = useFriends(state => state.potentialFriends)
  
  const isWannaBeFriendsLoading = useFriends(state => state.isWannaBeFriendsLoading)
  const wannaBeFriends = useFriends(state => state.wannaBeFriends)
  const getFriendshipWannabes = useFriends(state => state.getFriendshipWannabes)

  const [activeTab, setActiveTab] = useState<TabType>('incoming');


  useEffect(() => {
    if(activeTab === "incoming") {
      getFriendshipWannabes(userId)
    } else {
      console.log('lox');
    }
  }, [activeTab]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setActiveTab(e.target.value as TabType)
  }

  return (
    <div className="requestsPage">
        <div className="requestsPage__wrapper">
            <PageHeader name='Заявки'/>
            <div className="requestsPage__tabs">
              <List
                data={links}
                mapperData={(item) => (
                  <Label  htmlFor={item.binding} className={activeTab == item.binding ? "requestsPage__tabs-label tab-active" : "requestsPage__tabs-label"}>
                    <Label.Input
                      id={item.binding}
                      type="radio" 
                      name="tab"
                      value={item.binding} 
                      onChange={handleChange}
                      className="requestsPage__tabs-input"
                    />
                    <Label.Title className="requestsPage__tabs-tab">{item.label}</Label.Title>
                  </Label>
                )}
              />
            </div>
            {activeTab === 'incoming' ? 
              wannaBeFriends.length ? 
              <List
              data={wannaBeFriends}
              mapperData={(item, i) => (
                <ChatPreview  
                render={() => <button className="requestsPage__accept">Accept</button>}
                key={i} 
                name={item.username}/>
              )}
              /> : 
              <div className="friendsPage__empty">
                  Заявок нет D:
              </div>
              :
              potentialFriends.length ? 
                <List
                data={potentialFriends}
                mapperData={(item: User, i) => (
                  <ChatPreview  
                  render={() => <button className="requestsPage__cancel">Cancel</button>}
                  key={i} 
                  name={item.username}/>
                  
                )}
                /> : 
                <div className="friendsPage__empty">
                    Заявок нет D:
                </div>
            }
            
        </div>
    </div>
  );
};

export default RequestsPage;