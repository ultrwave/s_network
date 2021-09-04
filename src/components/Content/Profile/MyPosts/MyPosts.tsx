import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {MyPostsReduxForm} from './MyPostsForm';
import {PostType} from '../../../../types/types';

export type MyPostsType = {
    posts: Array<PostType>
    fullName: string
    avatar: string
    isOwner: boolean
    addPost(message: string): void
    editPost(postId: string, message: string): void
    deletePost(postId: string): void
    toggleMyLike(postId: string): void
    addLikesAnimation(postId: string, newLikesAmount: number): void
}

export const MyPosts = React.memo((props: MyPostsType) => {

    const fullName = props.fullName || 'loading'
    const userNameCapital = (fullName[0].toUpperCase() + fullName.slice(1)).split(' ')[0]
    const addLikes = (postId: string, newLikesAmount: number) => {
        props.addLikesAnimation(postId, newLikesAmount)
        props.toggleMyLike(postId)
    }

        const posts = props.posts.map((p) =>
            <Post key={p.postId}
                  postId={p.postId}
                  message={p.message}
                  isOwner={props.isOwner}
                  likesCount={p.likesCount}
                  myLike={p.myLike}
                  date={p.date}
                  setMyLike={(newLikes: number) => addLikes(p.postId, newLikes)}
                  editPost={props.editPost}
                  deletePost={props.deletePost}
                  avatar={props.avatar}
            />)

        const addPost = (values: { message: string }) => {
            props.addPost(values.message)
        }

        return (
            <div>
                {props.isOwner && <MyPostsReduxForm onSubmit={addPost}/>}
                <span className={Style.postButton}>{`${userNameCapital}'s posts:`}</span>
                <div className={Style.posts}>
                    {!props.posts.length && <span>No posts yet!</span>}
                    {posts}
                </div>
            </div>
        )
    }
)

