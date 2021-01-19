import React from 'react';
import Style from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {PostsDataType, UserProfileType} from '../../../types/types';

type PageProfilePropsType = { // todo - тут вообще должны быть пропсы?
    profile: UserProfileType | null
    // postsData: Array<PostsDataType>
    // newPostText: string
}

export function Profile(props:PageProfilePropsType) {

    return (
        <div className={Style.content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}