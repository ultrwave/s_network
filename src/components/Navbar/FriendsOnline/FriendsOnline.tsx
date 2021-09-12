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

    let friends: Array<UserType | undefined> = useSelector((state: StateType) => state.pageUsers.friendsOnline)
    if (!friends.length) {
        friends = [undefined, undefined, undefined]
    }

    return ( // todo - add refresh icon
        <div>
            <h2 className={Style.friendsTitle}
                onClick={() => dispatch(getFriendsOnlineThunk())}>Friends online</h2>
            <div className={Style.friendsOnline}>
                {friends.map((f, i) => <Friend friend={f} key={(f && f.id) || i}/>)}
            </div>
        </div>
    )
}