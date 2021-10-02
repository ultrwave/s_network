import Style from '../Navbar.module.css'; // todo - add css module
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk, setLatestFriendsMode} from '../../../redux/users-reducer';
import {StateType, UserType} from '../../../types/types';
import {Friend} from './Friend';

const userPlaceholder: UserType = {
    id: 'loading',
    name: 'Loading...',
    status: null,
    followed: false,
    uniqueUrlName: null,
    photos: {small: null, large: null}
}

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
                {friends.map((f, i) => {
                    console.log(`${f? f.name : i} mapped`);
                    return <Friend friend={f} key={f ? f.id : i}/>})}
            </div>
        </div>
    )
}