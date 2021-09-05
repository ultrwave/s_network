import React from 'react';
import Style from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder  from '../../../../assets/images/avatar_type_0_1.png'

type DialogItemProps = {
    dialogId: string
    name: string
    callback: (payload: {id: string}) => void
}

export function DialogItem (props: DialogItemProps) {

    let path: string = '/dialogs/' + props.dialogId;

    const setDialogIdCallback = () => { props.callback({id: props.dialogId}) }

    return (
        <div className={Style.dialog}>
            <img className={Style.avatar} src={userAvatarPlaceholder} alt='userAvatarPlaceholder'/>
            <NavLink to={path} onClick={setDialogIdCallback} activeClassName={Style.activeLink}>{props.name}</NavLink>
        </div>
    )
}
