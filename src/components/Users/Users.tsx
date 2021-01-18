import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import axios from 'axios';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}


export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    changePage = (page: number) => {

        this.props.setCurrentPage(page)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`) // todo - $ ?
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }
    // todo - почему в классе нужен метод рендер для отрисовки а в обычных компонентах не нужен?
    render() {

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        const pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div className={Style.users}>
                <div className={Style.pageButtons}>
                    {pages.map((p) => <span onClick={() => {this.changePage(p)}}
                        className={this.props.currentPage === p ? Style.selectedPage : ''}>{p}</span>)}

                </div>
                {this.props.users.map(
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
                                    this.props.toggleFollow(u.id)
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

}

