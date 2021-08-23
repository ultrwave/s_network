import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType, UserProfileType} from '../../../../types/types';
import {MyPostsReduxForm} from './MyPostsForm';

type MyPostsType = {
    postsData: Array<PostsDataType>
    profile: UserProfileType
    isOwner: boolean
    addPost(message: string): void
    editPost(postId: string, message: string): void
    toggleMyLike(postId: string): void
}

export const MyPosts = React.memo((props: MyPostsType) => {

    const fullName = props.profile.fullName
    const userNameCapital = (fullName[0].toUpperCase() + fullName.slice(1)).split(' ')[0]

        const posts = props.postsData.map(p =>
            <Post key={p.id}
                  postId={p.id}
                  message={p.message}
                  isOwner={props.isOwner}
                  likesCount={p.likesCount}
                  myLike={p.myLike}
                  date={p.date}
                  toggleMyLike={() => props.toggleMyLike(p.id)}
                  editPost={props.editPost}
                  avatar={props.profile.photos.large}
            />)

        const addPost = (values: { message: string }) => {
            props.addPost(values.message)
        }

        return (
            <div>
                {props.isOwner && <MyPostsReduxForm onSubmit={addPost}/>}
                <span className={Style.postButton}>{`${userNameCapital}'s posts:`}</span>
                <div className={Style.posts}>
                    {posts}
                </div>
            </div>
        )
    }
)

