import Style from '../Navbar.module.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk} from '../../../redux/users-reducer';
import {StateType, UserType} from '../../../types/types';
import {Friend} from './Friend';

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
                {friends.map(f => <Friend friend={f} key={f.id}/>)}
            </div>
        </div>
    )
}