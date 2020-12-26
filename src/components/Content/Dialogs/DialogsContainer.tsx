import React, {ChangeEvent, createRef, useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {
    ActionTypes,
    DialogItemType,
    DialogsDataType,
    MessageDataType,
} from '../../../redux/store';
import {addMessageAC, updateNewMessageTextAC} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';

type DialogsContentType = {
    data: {
        dialogItems: Array<DialogItemType>
        dialogsData: DialogsDataType
        newMessageText: string
    }
    dispatch: (action: ActionTypes) => void
}

export function DialogsContainer(props: DialogsContentType) {

    const [dialogId, setDialogId] = useState<string>(props.data.dialogItems[0].id)

    const dialogItems = props.data.dialogItems.map(d => <DialogItem key={d.id} dialogId={d.id} name={d.name} callback={setDialogId}/>)

    const addMessage = (e: React.MouseEvent<HTMLButtonElement>, newMessageRef: any) => {
        let text = newMessageRef.current?.value
        let isMine = true
        if (text && text.trim()) {
            if (e.shiftKey) {
                isMine = false
            }
            props.dispatch(addMessageAC(dialogId, isMine))
            if (newMessageRef.current && newMessageRef.current.value) {
                newMessageRef.current.focus()
            }
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageTextAC(e.currentTarget.value))
    }

    const focusHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget.value === 'Shift+click to send as friend') {
            props.dispatch(updateNewMessageTextAC(''))
        }
    }
    const blurHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!e.currentTarget.value.trim()) {
            props.dispatch(updateNewMessageTextAC('Shift+click to send as friend'))
        }
    }

    const messages = props.data.dialogsData[dialogId].map((m: MessageDataType) => <Message key={m.id} id={m.id} isMine={m.isMine} message={m.message}/>)

    return <Dialogs
        dialogItems={dialogItems}
        dialogsData={props.data.dialogsData}
        addMessage={addMessage}
        messages={messages}
        inputHandler={inputHandler}
        newMessageText={props.data.newMessageText}
        focusHandler={focusHandler}
        blurHandler={blurHandler}
    />
}