import Style from '../Navbar.module.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk, setFriendsOnline, setLatestFriendsMode} from '../../../redux/users-reducer';
import {StateType, UserType} from '../../../types/types';
import {Friend} from './Friend';

export function FriendsOnline() {

    const dispatch = useDispatch()
    const latestFriends = useSelector((state: StateType) => state.pageUsers.showLatestFriends)
    const friendsAmount = useSelector((state: StateType) => state.pageUsers.maxFriendsDisplay)

    useEffect(() => {
        dispatch(getFriendsOnlineThunk(latestFriends))
    }, [dispatch, latestFriends, friendsAmount])

    let friends: Array<UserType | undefined> = useSelector(
        (state: StateType) => state.pageUsers.friendsOnline)

    let friendsLoading = (new Array(friendsAmount)).fill(undefined)

    if (friends.length !== friendsAmount) {
        friends = friendsLoading
    }

    const toggleLatestFriends = () => {
        dispatch(setFriendsOnline({friendsOnline: friendsLoading}))
        dispatch(setLatestFriendsMode({latestFriends: !latestFriends}))
    }

    return ( // todo - add refresh icon
        <div className={Style.friendsOnlineContainer}>
            <h2 className={Style.friendsTitle}
                onClick={() => dispatch(getFriendsOnlineThunk(latestFriends))}>Friends online</h2>
            <span className={Style.toggleFriendsMode}
                  style={{color: latestFriends? '#9f9' : '#f9f'}}
                  onClick={toggleLatestFriends}>
                {'Showing ' + (latestFriends ? 'latest' : 'random')}</span>
            <div className={Style.friendsOnline}>
                {friends.map((f, i) =>
                    <Friend friend={f} key={(f && f.id) || i}/>)}
            </div>
        </div>
    )
}