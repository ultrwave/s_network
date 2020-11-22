import React from 'react';
import Style from './Dialogs.module.css';
import {DialogItem} from './DialogItem';

type PropsType = {

}

export function Dialogs(props: PropsType) {
    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                <DialogItem dialogId={1} name='Jane'/>
                <DialogItem dialogId={2} name='Tom'/>
                <DialogItem dialogId={3} name='Steve'/>
            </div>
            <div className={Style.messages}>
                <div className={Style.message}>Hi!</div>
                <div className={Style.message}>How are you?</div>
                <div className={Style.message}>Yo</div>
            </div>
        </div>
    )
}