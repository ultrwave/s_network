import React, {ChangeEvent, createRef, useState} from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {
    ActionTypes,
    DialogItemType,
    DialogsDataType,
    MessageDataType, StoreType,
} from '../../../redux/store';
import {addMessageAC, updateNewMessageTextAC, setDialogIdAC} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import StoreContext from '../../../StoreContext';

type DialogsContentType = {
    data: {
        dialogItems: Array<DialogItemType>
        dialogsData: DialogsDataType
        newMessageText: string
    }
    dispatch: (action: ActionTypes) => void
}

export function DialogsContainer() {


    return (
        <StoreContext.Consumer>
            { (store: StoreType) => {

                const dialogId = store.getState().pageDialogs.activeDialogId

                const setDialogId = (id: string) => {
                    store.dispatch(setDialogIdAC(id))
                }

                const dialogItems = store.getState().pageDialogs.dialogItems.map(d => <DialogItem
                    key={d.id}
                    dialogId={d.id}
                    name={d.name}
                    callback={setDialogId}
                />)

                const addMessage = (e: React.MouseEvent<HTMLButtonElement>, newMessageRef: any) => {
                    let text = newMessageRef.current?.value
                    let isMine = true
                    if (text && text.trim()) {
                        if (e.shiftKey) {
                            isMine = false
                        }
                        store.dispatch(addMessageAC(dialogId, isMine))
                        if (newMessageRef.current && newMessageRef.current.value) {
                            newMessageRef.current.focus()
                        }
                    }
                }

                const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch(updateNewMessageTextAC(e.currentTarget.value))
                }

                const focusHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    if (e.currentTarget.value === 'Shift+click to send as friend') {
                        store.dispatch(updateNewMessageTextAC(''))
                    }
                }
                const blurHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    if (!e.currentTarget.value.trim()) {
                        store.dispatch(updateNewMessageTextAC('Shift+click to send as friend'))
                    }
                }

                const messages = store.getState().pageDialogs.dialogsData[dialogId].map((m: MessageDataType) => <Message
                    key={m.id}
                    id={m.id}
                    isMine={m.isMine}
                    message={m.message}
                />)


                return (
                    <Dialogs
                        dialogItems={dialogItems}
                        dialogsData={store.getState().pageDialogs.dialogsData}
                        addMessage={addMessage}
                        messages={messages}
                        inputHandler={inputHandler}
                        newMessageText={store.getState().pageDialogs.newMessageText}
                        focusHandler={focusHandler}
                        blurHandler={blurHandler}
                    />
                )
            }
        }
        </StoreContext.Consumer>
    )
}