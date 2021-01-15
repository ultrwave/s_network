import React from 'react';
import Style from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export function Profile() {

    return (
        <div className={Style.content}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}