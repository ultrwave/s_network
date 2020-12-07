import React from 'react';
import Style from '../Dialogs.module.css';

type MessagePropsType = {
    id: string
    isMine: boolean
    message: string
}

export function Message(props: MessagePropsType) {

    const messageClass = props.isMine? 'message mineMessage' : 'message'

    return (
        <div className={Style[messageClass]}>

            {props.message}

        </div>
    )
}