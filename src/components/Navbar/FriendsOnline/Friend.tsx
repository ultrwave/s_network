import Style from '../Navbar.module.css';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder from '../../../assets/images/avatar_type_0_1.png';
import React from 'react';
import {UserType} from '../../../types/types';

type FriendPropsType = {
    friend: UserType
}
export function Friend ({friend}: FriendPropsType) {

    return <div className={Style.friend}>
        <NavLink to={'/profile/' + friend.id}>
            <div className={Style.avatar}>
                <img className={Style.friendAvatar}
                     src={friend.photos.large || userAvatarPlaceholder}
                     alt={friend.name}
                />
            </div>
        </NavLink>
    </div>
}