import React from 'react';
import Style from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemProps = {
    dialogId: number
    name: string
    callback: (id: number) => void
}

export function DialogItem (props: DialogItemProps) {

    let path: string = '/dialogs/' + props.dialogId;

    const clickHandler = () => {props.callback(props.dialogId)}

    return (
        <div className={Style.dialog}>
            <img className={Style.avatar} src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'></img>
            <NavLink to={path} onClick={clickHandler}>{props.name}</NavLink>
        </div>
    )
}
