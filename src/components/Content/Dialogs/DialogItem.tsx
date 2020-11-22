import React from 'react';
import Style from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    dialogId: number
    name: string
}

export function DialogItem (props: DialogItemProps) {
    return (
        <div className={Style.dialog}>
            <NavLink to={'/dialogs/' + props.dialogId}>{props.name}</NavLink>
        </div>
    )
}
