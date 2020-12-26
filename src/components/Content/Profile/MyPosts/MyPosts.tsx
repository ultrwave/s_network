import React, {ChangeEvent, createRef, ReactComponentElement, ReactElement} from 'react';
import Style from './MyPosts.module.css';

type MyPostsType = {
    posts: Array<ReactElement> // type ?
    inputHandler: (text: string) => void
    newPostText: string
    addPost: (ref: any) => void // type ?
}

export function MyPosts(props: MyPostsType) {

    const newPostRef = createRef<HTMLTextAreaElement>()

    const addPost = () => props.addPost(newPostRef)

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.inputHandler(e.target.value)
    }

    const posts = props.posts

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