import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import User from './User';
import Pagination from '../common/Pagination/Pagination';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (user: UserType) => void
    itemsOnPage: number
    totalUsersCount: number
    currentPage: number
    followRequestsInProgress: string[]
    onPageChange(page: number): void
    onSettingsChange(amount: number): void
}


export function Users(props: UsersPropsType) {

    return ( // todo - split props (Paginator / User)
        <div className={Style.users}>
            <Pagination currentPage={props.currentPage}
                        itemsOnPage={props.itemsOnPage}
                        totalItems={props.totalUsersCount}
                        onPageChange={props.onPageChange}
                        onSettingsChange={props.onSettingsChange}
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

