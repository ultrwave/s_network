import React, {ChangeEvent, createRef} from 'react';
import Style from './Dialogs.module.css';
import {DialogItemType, DialogsDataType, MessageDataType,} from '../../../redux/store';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';

type DialogsContentType = {
    dialogItems: Array<DialogItemType>
    dialogsData: DialogsDataType
    newMessageText: string
    activeDialogId: string
    setDialogId: (id: string) => void
    addMessage: (e: React.MouseEvent<HTMLButtonElement>, ref: any, activeDialogId: string) => void
    inputHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
    focusHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
    blurHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
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

    const newMessageRef = createRef<HTMLTextAreaElement>()

    const addMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.addMessage(e, newMessageRef, props.activeDialogId)
    }

    const inputHandler = props.inputHandler

    const focusHandler = props.focusHandler

    const blurHandler = props.blurHandler

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

                    <textarea ref={newMessageRef}
                              className={Style.text}
                              value={props.newMessageText}
                              onChange={inputHandler}
                              onFocus={focusHandler}
                              onBlur={blurHandler}
                    />

                    <button
                        className={Style.newMessageButton}
                        onClick={addMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}