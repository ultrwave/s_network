import React from 'react';
import Style from './Dialogs.module.css';

type PropsType = {

}

export function Dialogs(props: PropsType) {
    return (
        <div className={Style.dialogs}>
            <div className={Style.dialogsItems}>
                <div className={Style.dialog + ' ' + Style.active}>Jane</div>
                <div className={Style.dialog}>Steve</div>
                <div className={Style.dialog}>Tom</div>
                <div className={Style.dialog}>Rachel</div>
            </div>
            <div className={Style.messages}>
                <div className={Style.message}>Hi!</div>
                <div className={Style.message}>How are you?</div>
                <div className={Style.message}>Yo</div>
            </div>
        </div>
    )
}