import React, {ChangeEvent, useEffect, useState} from 'react';
import Style from '../Profile.module.css';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus(status: string): void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => setEditMode(true)
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const updateStatus = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    return (
        <div className={Style.status}>
            {!editMode
                ?
                <div>
                        <span onDoubleClick={activateEditMode}
                        >{props.status || 'loading...'}</span>
                </div>
                :
                <div>
                    <input autoFocus={true}
                           onBlur={updateStatus}
                           onChange={onStatusChange}
                           value={status}
                    />
                </div>
            }
        </div>
    )
}
