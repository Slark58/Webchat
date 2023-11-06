import { FC, ReactElement } from 'react'


import './ChatPreview.scss'


type TChatPreview = {
    name: string,
    status: boolean
    render?: () => ReactElement
}

const ChatPreview: FC<TChatPreview> = ({name, render}) => {
  
  return (  
    <div className='chatPreview'>
        <div className="chatPreview__wrapper">
            <div className="chatPreview__avatar">{name.charAt(0)}</div>
            <div className="chatPreview__name">{name}</div>
            {render?.()}
        </div>
    </div>
  )
}

export default ChatPreview