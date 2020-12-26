import React from 'react';
import Style from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionTypes, PostsDataType} from '../../../redux/store';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

type ProfileType = {
    data: {
        postsData: Array<PostsDataType>
        newPostText: string
    }
    dispatch: (action: ActionTypes) => void
}

export function Profile(props: ProfileType) {

    return (
        <div className={Style.content}>
            <ProfileInfo/>
            <MyPostsContainer
                postsData={props.data.postsData}
                newPostText={props.data.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    )
}