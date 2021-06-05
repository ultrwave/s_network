import React, {ChangeEvent, useEffect, useState} from 'react';

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
        <div>
            {!editMode
                ?
                <div>
                        <span onDoubleClick={activateEditMode}
                        >{props.status || '-----'}</span>
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
