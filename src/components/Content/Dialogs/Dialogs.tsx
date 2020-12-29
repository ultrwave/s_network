import React, {ChangeEvent, createRef, ReactElement} from 'react';
import Style from './Dialogs.module.css';
import { DialogsDataType, } from '../../../redux/store';

type DialogsContentType = {
    dialogItems: Array<ReactElement> // type ?
    dialogsData: DialogsDataType
    newMessageText: string
    messages: Array<ReactElement> // type ?
    addMessage: (e: React.MouseEvent<HTMLButtonElement>, ref: any) => void // type ?
    inputHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
    focusHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
    blurHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export function Dialogs(props: DialogsContentType) {

    const newMessageRef = createRef<HTMLTextAreaElement>()

    const addMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.addMessage(e, newMessageRef)
    }

    const inputHandler = props.inputHandler

    const focusHandler = props.focusHandler

    const blurHandler = props.blurHandler

    return (
        <div className={Style.dialogs}>
            {console.log('dialogs rendered')}
            <div className={Style.dialogsItems}>
                {props.dialogItems}
            </div>
            <div className={Style.dialogContent}>
                <div className={Style.dialog}>
                    <div className={Style.messages}>
                        {props.messages}
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