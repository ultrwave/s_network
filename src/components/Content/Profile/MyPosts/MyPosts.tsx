import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType} from '../../../../index';

type MyPostsDataType = {
    data: Array<PostsDataType>
}

export function MyPosts(props: MyPostsDataType) {

    let posts = props.data.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <span className={Style.postButton}>My Posts</span>
            <div>
                <span className={Style.postButton}>New Post</span>
            </div>
            <div className={Style.posts}>
                {posts}
            </div>
        </div>
    )
}