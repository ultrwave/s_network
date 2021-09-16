import Style from '../Navbar.module.css';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder from '../../../assets/images/avatar_type_0_1.png';
import React from 'react';
import {UserType} from '../../../types/types';
import loader from '../../../assets/images/loader.gif';

type FriendPropsType = {
    friend: UserType | undefined
}
export function Friend ({friend}: FriendPropsType) {

    return <div className={Style.friend}>
        {friend
            ? <NavLink to={'/profile/' + friend.id}>
            <div className={Style.avatar}>
                <img className={Style.friendAvatar}
                     style={{border: `2px solid ${+friend.id === 2 ? 'gold' : 'white'}`}}
                     src={friend.photos.large || userAvatarPlaceholder}
                     alt={friend.name}
                />
            </div>
        </NavLink>
        : <div className={Style.avatar}>
                <img className={Style.friendAvatar}
                     src={loader}
                     alt={'loading...'}
                />
            </div>}
    </div>
}