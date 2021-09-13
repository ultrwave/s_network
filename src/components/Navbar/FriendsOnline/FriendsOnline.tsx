import Style from '../Navbar.module.css';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk} from '../../../redux/users-reducer';
import {StateType, UserType} from '../../../types/types';
import {Friend} from './Friend';

export function FriendsOnline() {

    const dispatch = useDispatch()
    let [latestFriends, toggleLatestFriends] = useState(false)

    useEffect(() => {
        dispatch(getFriendsOnlineThunk(latestFriends))
    }, [dispatch, latestFriends])

    let friends: Array<UserType | undefined> = useSelector(
        (state: StateType) => state.pageUsers.friendsOnline)
    if (!friends.length) {
        friends = (new Array(3)).fill(undefined)
    }

    return ( // todo - add refresh icon
        <div>
            <h2 className={Style.friendsTitle}
                onClick={() => dispatch(getFriendsOnlineThunk(latestFriends))}>Friends online</h2>
            <span onClick={() => toggleLatestFriends(!latestFriends)}>
                {'Showing ' + (latestFriends ? 'latest' : 'random')}</span>
            <div className={Style.friendsOnline}>
                {friends.map((f, i) => <Friend friend={f} key={(f && f.id) || i}/>)}
            </div>
        </div>
    )
}