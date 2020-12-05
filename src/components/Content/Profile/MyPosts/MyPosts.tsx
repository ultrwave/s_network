import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';


export function MyPosts() {

    let postsData = [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Hello!', likesCount: 432},
        {id: 3, message: 'Good day!', likesCount: 2}
    ]

    let posts = postsData.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

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