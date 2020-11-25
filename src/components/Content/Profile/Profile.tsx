import React from 'react';
import Style from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';


export function Profile() {
    return (
        <div className={Style.content}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}