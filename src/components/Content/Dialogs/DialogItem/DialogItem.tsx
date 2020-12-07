import React from 'react';
import Style from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    dialogId: string
    name: string
    callback: (id: string) => void
}

export function DialogItem (props: DialogItemProps) {

    let path: string = '/dialogs/' + props.dialogId;

    const setDialogIdCallback = () => {props.callback(props.dialogId)}

    return (
        <div className={Style.dialog}>
            <img className={Style.avatar} src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'></img>
            <NavLink to={path} onClick={setDialogIdCallback}>{props.name}</NavLink>
        </div>
    )
}
