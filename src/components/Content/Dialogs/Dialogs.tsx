import React, {useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';

type PropsType = {
    message: string
}

function Message (props: PropsType) {
    return (
        <div className={Style.message}>{props.message}</div>
    )
}

export function Dialogs() {

    const [dialogMessagesId, setDialogMessagesId] = useState<number>(0)

    const setDialogMessagesCallbackId = (id: number) => setDialogMessagesId(id - 1)

    let dialogsData = [
        {id: 1, name: 'Jane'},
        {id: 2, name: 'Tom'},
        {id: 3, name: 'Steve'},
        {id: 4, name: 'Jack'},
        {id: 5, name: 'Anna'}
    ]

    let messagesData = [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Hello!'},
        {id: 3, message: 'Whats up?'},
        {id: 4, message: 'Good day!'},
        {id: 5, message: 'Yo!'}
    ]

    let dialogs = dialogsData.map(d => <DialogItem dialogId={d.id} name={d.name} callback={setDialogMessagesCallbackId}/>)
    
    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                {dialogs}
            </div>
            <div className={Style.messages}>
                <Message message={messagesData[dialogMessagesId].message}/>
            </div>
        </div>
    )
}