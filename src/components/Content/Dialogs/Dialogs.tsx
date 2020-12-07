import React, {useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogItemType, MessageDataType} from '../../../redux/state';

type DialogsContentType = {
    data: {
        dialogItems: Array<DialogItemType>
        dialogsData: any // type?
    }
}

export function Dialogs(props: DialogsContentType) {

    const[dialogId, setDialogId] = useState<string>(props.data.dialogItems[0].id)

    const dialogItems = props.data.dialogItems.map(d => <DialogItem dialogId={d.id} name={d.name} callback={setDialogId}/>)

    const messages = props.data.dialogsData[dialogId].map((m: MessageDataType) => <Message id={m.id} isMine={m.isMine} message={m.message}/>)

    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                {dialogItems}
            </div>
            <div className={Style.dialog}>
                <div className={Style.messages}>
                    {messages}
                </div>
            </div>
        </div>
    )
}