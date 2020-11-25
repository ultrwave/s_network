import React from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem';

type PropsType = {
    message: string
}

function Message (props: PropsType) {
    return (
        <div className={Style.message}>{props.message}</div>
    )
}

export function Dialogs(props: PropsType) {
    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                <DialogItem dialogId={1} name='Jane'/>
                <DialogItem dialogId={2} name='Tom'/>
                <DialogItem dialogId={3} name='Steve'/>
            </div>
            <div className={Style.messages}>
                <Message message='Hi!'/>
                <Message message='How are you?'/>
                <Message message='Yo!'/>
            </div>
        </div>
    )
}