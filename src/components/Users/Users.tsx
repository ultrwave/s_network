import React from 'react';
import Style from './Users.module.css';
import {UserType} from '../../types/types';
import axios from 'axios';

type UsersPropsType = {
    users: Array<UserType>
    toggleFollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}


export class Users extends React.Component<UsersPropsType> {

    constructor(props: UsersPropsType) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })

    }

    getUsers = () => {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }


    render() {
        return (
            <div className={Style.users}>
                <button onClick={this.getUsers}>Get Users</button>
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

