import React, {createRef, useRef} from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType} from '../../../../redux/state';

type MyPostsDataType = {
    data: Array<PostsDataType>
    addPost: (msg: string) => void
}

export function MyPosts(props: MyPostsDataType) {

    let newPostRef = createRef<HTMLTextAreaElement>()

    let addPost = () => {
        let text = newPostRef.current?.value
        if (text && text.trim()) {
            props.addPost(text)
            if (newPostRef.current && newPostRef.current.value) {
                newPostRef.current.value = ''
                newPostRef.current.focus()
            }
        }
    }

    let posts = props.data.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <span className={Style.postButton}>My Posts</span>
            <div className={Style.addPostSection}>
                <textarea ref={newPostRef} className={Style.text} name="newPost"></textarea>
                <button className={Style.postButton} onClick={addPost}>Send new post</button>
            </div>
            <div className={Style.posts}>
                {posts}
            </div>
        </div>
    )
}