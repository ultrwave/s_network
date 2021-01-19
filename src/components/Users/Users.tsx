import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChange: (page: number) => void
}


export function Users (props: UsersPropsType) {


        const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

        const pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i)
        }
// todo - заменить ссылки на картинки импортами
        return (
            <div className={Style.users}>
                <div className={Style.pageButtons}>
                    {pages.map((p) => <span onClick={() => {props.onPageChange(p)}}
                        className={props.currentPage === p ? Style.selectedPage : ''}>{p}</span>)}

                </div>
                {props.users.map(
                    u =>
                        <div key={u.id} className={Style.user}>
                            <NavLink to={'/profile/' + u.id}>
                                <div className={Style.avatar}>
                                    <img
                                        src={u.photos.small != null ? u.photos.small : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'}
                                        alt={u.name}
                                    />
                                </div>
                            </NavLink>
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



