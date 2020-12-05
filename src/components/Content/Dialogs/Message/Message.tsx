import React from 'react';
import Style from '../Dialogs.module.css';

type MessagePropsType = {
    message: string
}

export function Message(props: MessagePropsType) {
    return (
        <div className={Style.message}>{props.message}</div>
    )
}