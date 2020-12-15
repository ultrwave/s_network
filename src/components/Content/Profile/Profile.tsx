import React, {useState} from 'react';
import Style from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsDataType} from '../../../redux/state';

type MyPostsDataType = {
    data: Array<PostsDataType>
    addPost: () => void
    newPostInput: (t: string) => void
    newPostText: string
}

export function Profile(props: MyPostsDataType) {

    const [animFrame, setAnimFrame] = useState('Profile')

    const setFrameDelay = (f:string) => {setTimeout(() => setAnimFrame(f), 1000 )}


    return (
        <div className={Style.content}>
            <ProfileInfo animation={setFrameDelay} frame={animFrame}/>
            <MyPosts data={props.data}
                     addPost={props.addPost}
                     newPostInput={props.newPostInput}
                     newPostText={props.newPostText}
            />
        </div>
    )
}