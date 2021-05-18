import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus(status: string): void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    const toggleEditMode = () => {}

    return (
        <div>
            {
                <div>
                        <span onDoubleClick={toggleEditMode}
                        >{props.status || '-----'}</span>
                </div>
            }
            {false &&
            <div>
                <input autoFocus={true}
                       value={''}
                       onBlur={a => a}
                       onChange={a => a}
                />
            </div>
            }
        </div>
    )
}
