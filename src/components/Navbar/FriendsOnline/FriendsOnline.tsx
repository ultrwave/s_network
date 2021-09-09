import Style from '../Navbar.module.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendsOnlineThunk} from '../../../redux/users-reducer';
import {StateType} from '../../../types/types';

export function FriendsOnline() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsOnlineThunk())
    }, [dispatch])

    const friends = useSelector((state: StateType) => state.pageUsers.friendsOnline)
    console.log('FriendsOnline rendered')
    console.log(friends)

    return (
        <div>
            <h2 className={Style.friendsTitle}>Friends online</h2>
            <div className={Style.friendsOnline}>
                <div className={Style.friend}>
                    <div className={Style.friendAvatar}></div>
                    <span className={Style.friendName}>Joe</span>
                </div>
                <div className={Style.friend}>
                    <div className={Style.friendAvatar}></div>
                    <span className={Style.friendName}>Jack</span>
                </div>
                <div className={Style.friend}>
                    <div className={Style.friendAvatar}></div>
                    <span className={Style.friendName}>Jane</span>
                </div>
            </div>
        </div>
    )
}