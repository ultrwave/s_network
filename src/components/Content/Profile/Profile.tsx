import React from 'react';
import Style from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsDataType} from '../../../redux/state';

type MyPostsDataType = {
    data: Array<PostsDataType>
    addPost: (msg: string) => void
}

export function Profile(props: MyPostsDataType) {
    return (
        <div className={Style.content}>
            <ProfileInfo/>
            <MyPosts data={props.data} addPost={props.addPost}/>
        </div>
    )
}