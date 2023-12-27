import React, { useEffect, useRef } from 'react'

import './ChatWindow.scss'
import { List } from '..'
import { message } from './message'
import { Paperclip, Smile } from 'lucide-react'

const ChatWindow = () => {

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Проверка наличия контейнера чата и наличия сообщений
        if (chatContainerRef.current && message.length > 0) {
          const chatContainer = chatContainerRef.current;
          // Установка скролла внизу контейнера чата
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, []);

  return (
    <div className='chatWindow' ref={chatContainerRef}>
        <div className="chatWindow__wrapper">
            <List 
                data={message}
                mapperData={(mes) => (
                    <div className={"message " + mes.status}>{mes.message}</div>
                )}
            />

            <div className="chatWrapper-block">
                <div className="chatWrapper-icons">
                    <Smile className='chatWrapper-icons-smile'/>
                </div>
                <div className="chatWrapper-input">
                    <input type="text" />
                </div>
                <div className="chatWrapper-file">
                    <label>
                        <div className="chatWrapper-file-icon">
                            <Paperclip className='chatWrapper-icons-Paperclip' />
                        </div>
                        <input type="file" />
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatWindow