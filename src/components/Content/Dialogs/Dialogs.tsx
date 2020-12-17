import React, {ChangeEvent, createRef, useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {
    addMessageActionCreator,
    DialogItemType,
    DialogsDataType,
    MessageDataType, updateNewMessageTextActionCreator, updateNewPostTextActionCreator
} from '../../../redux/state';

type DialogsContentType = {
    data: {
        dialogItems: Array<DialogItemType>
        dialogsData: DialogsDataType
        newMessageText: string
    }
    dispatch: any
}

export function Dialogs(props: DialogsContentType) {

    const [dialogId, setDialogId] = useState<string>(props.data.dialogItems[0].id)

    const dialogItems = props.data.dialogItems.map(d => <DialogItem dialogId={d.id} name={d.name}
                                                                    callback={setDialogId}/>)

    const newMessageRef = createRef<HTMLTextAreaElement>()

    const addMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let text = newMessageRef.current?.value
        let isMine = true
        if (text && text.trim()) {
            if (e.shiftKey) {
                isMine = false
            }
            props.dispatch(addMessageActionCreator(dialogId, isMine))
            if (newMessageRef.current && newMessageRef.current.value) {
                newMessageRef.current.focus()
            }
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageTextActionCreator(e.currentTarget.value))
    }

    const focusHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value === 'Shift+click to send as friend') {
            props.dispatch(updateNewMessageTextActionCreator(''))
        }
    }
    const blurHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!e.currentTarget.value.trim()) {
            props.dispatch(updateNewMessageTextActionCreator('Shift+click to send as friend'))
        }
    }

    const messages = props.data.dialogsData[dialogId].map((m: MessageDataType) => <Message id={m.id} isMine={m.isMine}
                                                                                           message={m.message}/>)

    return (
        <div className={Style.dialogs}>
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
                    {/*<span className={Style.sendAs}>SEND AS ME</span>*/}

                    <textarea ref={newMessageRef}
                              className={Style.text}
                              value={props.data.newMessageText}
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