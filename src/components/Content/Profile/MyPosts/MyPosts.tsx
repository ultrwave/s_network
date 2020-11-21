import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';


export function MyPosts() {
    return (
        <div>
            My Posts
            <div>
                New Post
            </div>
            <div className={Style.posts}>
                <Post message={"Hi!"} likesCount={5}/>
                <Post message={"Hello!"} likesCount={23}/>
                <Post message={"Good morning!"} likesCount={126}/>
            </div>
        </div>
    )
}