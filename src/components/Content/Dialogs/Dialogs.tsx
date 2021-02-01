import React, {ChangeEvent, createRef, RefObject} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogItemType, DialogsDataType, MessageDataType} from '../../../types/types';
import { Redirect } from 'react-router-dom';

type DialogsContentType = {
    dialogItems: Array<DialogItemType>
    dialogsData: DialogsDataType
    newMessageText: string
    activeDialogId: string
    isAuth: boolean
    setDialogId (id: string): void
    addMessage (dialogId: string, isMine: boolean): void
    updateNewMessageText (text: string): void
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

    const newMessageRef: RefObject<HTMLTextAreaElement> = createRef<HTMLTextAreaElement>()

    const addMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
            let text = newMessageRef.current?.value
            let isMine = true
            if (text && text.trim()) {
                if (e.shiftKey) {
                    isMine = false
                }
                props.addMessage(props.activeDialogId, isMine)
                if (newMessageRef.current && newMessageRef.current.value) {
                    newMessageRef.current.focus()
                }
            }
        }

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    const focusHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value === 'Shift+click to send as friend') {
            props.updateNewMessageText('')
        }
    }

    const blurHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!e.currentTarget.value.trim()) {
            props.updateNewMessageText('Shift+click to send as friend')
        }
    }

    if (!props.isAuth) return <Redirect to='/login'/>

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