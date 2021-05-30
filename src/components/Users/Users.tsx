import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import User from './User';

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
                {pages.map(p => {
                    return (
                        <span key={p}
                              onClick={() => {
                                  props.onPageChange(p)
                              }}
                              className={props.currentPage === p ? Style.selectedPage : ''}>
                            {p}
                        </span>
                    )
                })}
            </div>
            {props.users.map(
                u => <User
                    user={u}
                    toggleFollow={props.toggleFollow}
                    followRequestsInProgress={props.followRequestsInProgress}
                />
            )}
        </div>
    )
}

