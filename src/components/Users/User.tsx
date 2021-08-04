import React from 'react';
import Style from './Users.module.css';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder from '../../assets/images/avatar_type_0_1.png';
import {UserType} from '../../types/types';

type UserPropsType = {
    user: UserType
    followRequestsInProgress: Array<string>
    toggleFollow(user: UserType): void
}

function User ({user, toggleFollow, followRequestsInProgress}: UserPropsType) {

    return (
        <div className={Style.user}>
            <NavLink to={'/profile/' + user.id}>
                <div className={Style.avatar}>
                    <img
                        src={user.photos.small != null ? user.photos.small : userAvatarPlaceholder}
                        alt={user.name}
                    />
                </div>
            </NavLink>
            <div>
                <button disabled={followRequestsInProgress.includes(user.id)}
                        onClick={() => {
                            toggleFollow(user)
                        }}>


                    {user.followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            <div className={Style.info}>
                <div className={Style.name}>{user.name}</div>
                <div className={Style.status}>{user.status}</div>
                <div className={Style.location}>
                    <div>{'id: ' + user.id}</div>
                </div>
            </div>
        </div>
    );
}

export default User;