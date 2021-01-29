import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import {NavLink} from 'react-router-dom';
import userAvatarPlaceholder from '../../assets/images/avatar_type_0_1.png'

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (user: UserType) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChange: (page: number) => void
    followRequestsInProgress: string[]
}


export function Users(props: UsersPropsType) {


    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={Style.users}>
            <div className={Style.pageButtons}>
                {pages.map(p => <span key={p}
                                      onClick={() => {
                                          props.onPageChange(p)
                                      }}
                                      className={props.currentPage === p ? Style.selectedPage : ''}>{p}</span>)}

            </div>
            {props.users.map(
                u =>
                    <div key={u.id} className={Style.user}>
                        <NavLink to={'/profile/' + u.id}>
                            <div className={Style.avatar}>
                                <img
                                    src={u.photos.small != null ? u.photos.small : userAvatarPlaceholder}
                                    alt={u.name}
                                />
                            </div>
                        </NavLink>
                        <div>
                            <button disabled={props.followRequestsInProgress.includes(u.id)}
                                    onClick={() => {
                                props.toggleFollow(u)
                            }} >


                                {u.followed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                        <div className={Style.info}>
                            <div className={Style.name}>{u.name}</div>
                            <div className={Style.status}>{u.status}</div>
                            <div className={Style.location}>
                                <div>{'id: ' + u.id}</div>
                            </div>
                        </div>

                    </div>
            )}
        </div>
    )
}



