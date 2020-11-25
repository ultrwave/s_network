import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';


export function MyPosts() {
    return (
        <div>
            <span className={Style.postButton}>My Posts</span>
            <div>
                <span className={Style.postButton}>New Post</span>
            </div>
            <div className={Style.posts}>
                <Post message={"Hi!"} likesCount={5}/>
                <Post message={"Hello!"} likesCount={23}/>
                <Post message={"Good morning!"} likesCount={126}/>
            </div>
        </div>
    )
}