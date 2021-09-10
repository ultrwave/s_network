import Style from '../Navbar.module.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk} from '../../../redux/users-reducer';
import {StateType, UserType} from '../../../types/types';
import userAvatarPlaceholder from '../../../assets/images/avatar_type_0_1.png';
import {NavLink} from 'react-router-dom';

export function FriendsOnline() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsOnlineThunk())
    }, [dispatch])

    const friends: UserType[] = useSelector((state: StateType) => state.pageUsers.friendsOnline)


    return (
        <div>
            <h2 className={Style.friendsTitle}>Friends online</h2>
            <div className={Style.friendsOnline}>
                {friends.map(
                    friend => (
                        <div className={Style.friend}
                             key={friend.id}>
                            <NavLink to={'/profile/' + friend.id}>
                                <div className={Style.avatar}>
                                    <img className={Style.friendAvatar}
                                         src={friend.photos.large || userAvatarPlaceholder}
                                         alt={friend.name}
                                    />
                                </div>
                            </NavLink>
                        </div>))}
            </div>
        </div>
    )
}