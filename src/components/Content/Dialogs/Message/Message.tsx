import React from 'react';
import Style from '../Dialogs.module.css';

type MessagePropsType = {
    id: string
    isMine: boolean
    message: string
}

export function Message(props: MessagePropsType) {

    const messageClass = Style.message + (props.isMine? (' ' + Style.mineMessage) : '')

    const msgAvatar =  props.isMine? 'https://kovadm.ru/wp-content/uploads/2020/02/avatar-placeholder.png' : 'https://media.istockphoto.com/vectors/person-gray-photo-placeholder-woman-vector-id1177794485?b=1&k=6&m=1177794485&s=612x612&w=0&h=8INMsj4jnjSOComnh3-5VJPDxbO2D-0vIz1E92aR4L4='

    const msgName = props.isMine? 'Me' : 'Friend'

    return (
        <div className={messageClass}>
            <img className={Style.msgAvatar} src={msgAvatar} alt='avatar'/>
            <div className={Style.messageBox}>
                <span className={Style.name}>{msgName}</span>
                <p className={Style.text}>{props.message}</p>
                <span className={Style.time}>00.01</span>
            </div>
        </div>
    )
}