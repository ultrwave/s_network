import React from 'react';
import {Post} from './Post/Post';
import {ActionTypes, PostsDataType} from '../../../../redux/store';
import {addPostAC, updateNewPostTextAC} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';

type MyPostsType = {
    postsData: Array<PostsDataType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export function MyPostsContainer(props: MyPostsType) {

    const addPost = (ref: any) => {
        let text = ref.current?.value
        if (text && text.trim()) {
            props.dispatch(addPostAC())
            if (ref.current && ref.current.value) {
                ref.current.focus()
            }
        }
    }

    const inputHandler = (text: string) => {
        props.dispatch(updateNewPostTextAC(text))
    }

    const posts = props.postsData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    return <MyPosts posts={posts} inputHandler={inputHandler} newPostText={props.newPostText} addPost={addPost}/>
}