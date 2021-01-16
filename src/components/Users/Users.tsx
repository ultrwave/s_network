import React from 'react';
import Style from './Users.module.css';
import {v1} from 'uuid';
import {UserType} from '../../types/types';
import axios from 'axios';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}

export function Users(props: UsersPropsType) {

    const getUsers = () => {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items)
            })
    }

    const initUsers: Array<any> = [
        {
            id: v1(),
            name: 'Dmitry',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
            status: 'one two three',
            location: {city: 'Minsk', country: 'Belarus'},
            followed: true
        },
        {
            id: v1(),
            name: 'Egor',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/manager-2506834-2130095.png',
            status: 'hey hey hey',
            location: {city: 'Moscow', country: 'Russia'},
            followed: false
        },
        {
            id: v1(),
            name: 'Sasha',
            photoUrl: 'https://cdn.iconscout.com/icon/free/png-512/avatar-369-456321.png',
            status: 'what a wonderful day!',
            location: {city: 'Saint Petersburg', country: 'Russia'},
            followed: false
        },
    ]

    return (
        <div className={Style.users}>
            <button onClick={getUsers}>Get Users</button>
            {props.users.map(
                u =>
                    <div key={u.id} className={Style.user}>
                        <div className={Style.avatar}>
                            <img
                                src={u.photos.small != null ? u.photos.small : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
                                alt={u.name}
                            />
                        </div>
                        <div>
                            <button onClick={() => {
                                props.toggleFollow(u.id)
                            }}>
                                {u.followed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                        <div className={Style.info}>
                            <div className={Style.name}>{u.name}</div>
                            <div className={Style.status}>{u.status}</div>
                            <div className={Style.location}>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </div>
                        </div>

                    </div>
            )}
        </div>
    )
}