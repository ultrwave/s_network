import Style from '../Navbar.module.css';
import React from 'react';

export function FriendsOnline() {
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