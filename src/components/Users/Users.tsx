import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import User from './User';
import {Paginator} from '../common/Paginator/Paginator';
import PaginationContainer from '../common/Pagination/PaginationContainer';

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

    return ( // todo - split props (Paginator / User)
        <div className={Style.users}>
            <PaginationContainer onPageChange={props.onPageChange}
                                 totalItems={props.totalUsersCount}
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

