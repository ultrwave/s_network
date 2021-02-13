import React from 'react';
import Style from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../../types/types';

type PageProfilePropsType = {
    profile: UserProfileType | null
}

export function Profile(props:PageProfilePropsType) {

    return (
        <div className={Style.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}