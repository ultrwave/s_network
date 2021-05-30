import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import User from './User';
import {Pagination} from '../common/Pagination/Pagination';

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

    return ( // todo - split props (Pagination / User)
        <div className={Style.users}>
            <Pagination currentPage={props.currentPage}
                        pageSize={props.pageSize}
                        totalUsersCount={props.totalUsersCount}
                        onPageChange={props.onPageChange}
            />
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

