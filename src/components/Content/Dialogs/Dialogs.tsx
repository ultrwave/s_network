import React, {ChangeEvent, createRef, RefObject, useMemo} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogItemType, DialogsDataType, MessageDataType} from '../../../types/types';
import {DialogsMessageReduxForm} from './DialogsMessageForm';

export type DialogsContentType = {
    dialogItems: Array<DialogItemType>
    dialogsData: DialogsDataType
    activeDialogId: string
    setDialogId(id: string): void
    addMessage(dialogId: string, message: string, isMine: boolean): void
    updateNewMessageText(text: string): void
}

export function Dialogs(props: DialogsContentType) {

    const dialogItems = props.dialogItems.map(d => <DialogItem
        key={d.id}
        dialogId={d.id}
        name={d.name}
        callback={props.setDialogId}
    />)

    const messages = props.dialogsData[props.activeDialogId].map((m: MessageDataType) => <Message
        key={m.id}
        id={m.id}
        isMine={m.isMine}
        message={m.message}
    />)

    const addNewMessage = (values: {message: string, sendAsFriend: boolean}) => {
        props.addMessage(props.activeDialogId, values.message, !values.sendAsFriend)
    }

    return (
        <div className={Style.dialogs}>
            {console.log('dialogs rendered')}
            <div className={Style.dialogsItems}>
                {dialogItems}
            </div>
            <div className={Style.dialogContent}>
                <div className={Style.dialog}>
                    <div className={Style.messages}>
                        {messages}
                    </div>
                </div>

                <div className={Style.addMessageSection}>
                    <DialogsMessageReduxForm onSubmit={addNewMessage}/>
                </div>

            </div>
        </div>
    )
}