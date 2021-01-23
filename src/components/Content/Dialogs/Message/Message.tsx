import React from 'react';
import Style from '../Dialogs.module.css';
import myAvatarPlaceholder from '../../../../assets/images/avatar-placeholder_A.png'
import friendAvatarPlaceholder from '../../../../assets/images/avatar-placeholder_B.jpg'


type MessagePropsType = {
    id: string
    isMine: boolean
    message: string
}

export function Message(props: MessagePropsType) {

    const messageClass = Style.message + (props.isMine? (' ' + Style.mineMessage) : '')

    const myAvatarUrl = myAvatarPlaceholder

    const friendAvatarUrl = friendAvatarPlaceholder

    const msgAvatarUrl =  props.isMine? myAvatarUrl : friendAvatarUrl

    const msgName = props.isMine? 'Me' : 'Friend'

    return (
        <div className={messageClass}>
            <img className={Style.msgAvatar} src={msgAvatarUrl} alt='avatar'/>
            <div className={Style.messageBox}>
                <span className={Style.name}>{msgName}</span>
                <p className={Style.text}>{props.message}</p>
                <span className={Style.time}>00.01</span>
            </div>
        </div>
    )
}