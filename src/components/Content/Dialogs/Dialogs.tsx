import React, {useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogItemDataType, MessagesDataType} from '../../../redux/state';

type DialogsDataType = {
    data: {
        dialogItemData: Array<DialogItemDataType>,
        messagesData: Array<MessagesDataType>
    }
}

export function Dialogs(props: DialogsDataType) {

    const [dialogMessagesId, setDialogMessagesId] = useState<number>(0)

    const setDialogMessagesCallbackId = (id: number) => setDialogMessagesId(id - 1)

    let dialogs = props.data.dialogItemData.map(d => <DialogItem dialogId={d.id} name={d.name} callback={setDialogMessagesCallbackId}/>)

    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                {dialogs}
            </div>
            <div className={Style.messages}>
                <Message message={props.data.messagesData[dialogMessagesId].message}/>
            </div>
        </div>
    )
}