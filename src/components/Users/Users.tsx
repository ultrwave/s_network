import React from 'react';
import Style from './Users.module.css';
import {v1} from 'uuid';
import {UserType} from '../../types/types';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}

export function Users(props: UsersPropsType) {

    const initUsers: Array<UserType> = [
        {
            id: v1(),
            firstName: 'Dmitry',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
            status: 'one two three',
            location: {city: 'Minsk', country: 'Belarus'},
            isFollowed: true
        },
        {
            id: v1(),
            firstName: 'Egor',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/manager-2506834-2130095.png',
            status: 'hey hey hey',
            location: {city: 'Moscow', country: 'Russia'},
            isFollowed: false
        },
        {
            id: v1(),
            firstName: 'Sasha',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-369-456321.png',
            status: 'what a wonderful day!',
            location: {city: 'Saint Petersburg', country: 'Russia'},
            isFollowed: false
        },
    ]

    if (props.users.length === 0) { // todo - сетает юзеров 2 раза (баг)
        props.setUsers(initUsers)
    }

    return (
        <div className={Style.users}>
            {props.users.map(
                u =>
                    <div key={u.id} className={Style.user}>
                        <div className={Style.avatar}>
                            <img src={u.photoUrl} alt={u.firstName}/>
                        </div>
                        <div>
                            <button onClick={() => {
                                props.toggleFollow(u.id)
                            }}>
                                {u.isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                        <div className={Style.info}>
                            <div className={Style.name}>{u.firstName}</div>
                            <div className={Style.status}>{u.status}</div>
                            <div className={Style.location}>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </div>
                        </div>

                    </div>
            )}
        </div>
    )
}