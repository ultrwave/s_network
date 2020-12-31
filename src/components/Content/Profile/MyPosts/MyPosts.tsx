import React, {ChangeEvent, createRef, ReactComponentElement, ReactElement} from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType} from '../../../../redux/store';

type MyPostsType = {
    postsData: Array<PostsDataType>
    inputHandler: (text: string) => void
    newPostText: string
    addPost: (ref: any) => void // todo: fix type
}

export function MyPosts(props: MyPostsType) {

    const posts = props.postsData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const newPostRef = createRef<HTMLTextAreaElement>()

    const addPost = () => props.addPost(newPostRef)

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.inputHandler(e.target.value)
    }

    return (
        <div>
            <span className={Style.postButton}>My Posts</span>
            <div className={Style.addPostSection}>
                <textarea ref={newPostRef}
                          className={Style.text}
                          value={props.newPostText}
                          onChange={inputHandler}
                />
                <button className={Style.postButton} onClick={addPost}>Send new post</button>
            </div>
            <div className={Style.posts}>
                {posts}
            </div>
        </div>
    )
}