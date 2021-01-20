import React, {ChangeEvent, createRef, RefObject} from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType} from '../../../../types/types';

type MyPostsType = {
    postsData: Array<PostsDataType>
    updateNewPostText: (text: string) => void
    newPostText: string
    addPost: () => void
}

export function MyPosts(props: MyPostsType) {

    const posts = props.postsData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const newPostRef = createRef<HTMLTextAreaElement>()

    const addPost = (ref: RefObject<HTMLTextAreaElement> ) => {
        let text = ref.current?.value
        if (text && text.trim()) {
            props.addPost()
            if (ref.current && ref.current.value) {
                ref.current.focus()
            }
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.target.value)
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
                <button className={Style.postButton} onClick={() => {addPost(newPostRef)}}>Send new post</button>
            </div>
            <div className={Style.posts}>
                {posts}
            </div>
        </div>
    )
}