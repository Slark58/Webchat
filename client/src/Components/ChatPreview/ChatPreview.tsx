import React, { FC } from 'react'


import './ChatPreview.scss'


type TChatPreview = {
    name: string,
    status: boolean
}

const ChatPreview: FC<TChatPreview> = ({name, status}) => {

  return (
    <div className='chatPreview'>
        <div className="chatPreview__wrapper">
            <div className="chatPreview__avatar">
                <img src="chatPreview__avatar-img" alt="avatar" />
            </div>
            <div className="chatPreview__name">{name}</div>
            <div className={`chatPreview__status  ${status ? 'status-online' : 'status-offline'}`}></div>
        </div>
    </div>
  )
}

export default ChatPreview