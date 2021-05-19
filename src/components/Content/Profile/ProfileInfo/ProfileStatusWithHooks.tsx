import React, {ChangeEvent, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus(status: string): void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const toggleEditMode = () => setEditMode(!editMode)
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ?
                <div>
                        <span onDoubleClick={toggleEditMode}
                        >{props.status || '-----'}</span>
                </div>
                :
                <div>
                    <input autoFocus={true}
                           onBlur={toggleEditMode}
                           onChange={onStatusChange}
                           value={status}
                    />
                </div>
            }
        </div>
    )
}
