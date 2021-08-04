import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import User from './User';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (user: UserType) => void
    followRequestsInProgress: string[]
}


export function Users(props: UsersPropsType) {

    return (
        <div className={Style.users}>
                {props.users.map(
                    u => <User key={u.id}
                               user={u}
                               toggleFollow={props.toggleFollow}
                               followRequestsInProgress={props.followRequestsInProgress}
                    />
                )}
        </div>
    )
}

