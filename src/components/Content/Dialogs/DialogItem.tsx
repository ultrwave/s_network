import React from 'react';
import Style from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    dialogId: number
    name: string
}

export function DialogItem (props: DialogItemProps) {

    let path: string = '/dialogs/' + props.dialogId;

    return (
        <div className={Style.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}
