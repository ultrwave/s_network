import React from 'react';
import Style from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsDataType} from '../../../redux/state';

type ProfileType = {
    data: {
        postsData: Array<PostsDataType>
        newPostText: string
    }
    dispatch: any
}

export function Profile(props: ProfileType) {

    return (
        <div className={Style.content}>
            <ProfileInfo/>
            <MyPosts data={props.data.postsData}
                     dispatch={props.dispatch}
                     newPostText={props.data.newPostText}
            />
        </div>
    )
}