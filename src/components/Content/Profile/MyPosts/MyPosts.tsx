import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType, UserProfileType} from '../../../../types/types';
import {MyPostsReduxForm} from './MyPostsForm';

type MyPostsType = {
    postsData: Array<PostsDataType>
    addPost: (message: string) => void
    profile: UserProfileType
}

export const MyPosts = React.memo((props: MyPostsType) => {

        const posts = props.postsData.map(p =>
            <Post key={p.id}
                  message={p.message}
                  likesCount={p.likesCount}
                  avatar={props.profile.photos.large}
            />)

        const addPost = (values: { message: string }) => {
            props.addPost(values.message)
        }

        return (
            <div>
                <span className={Style.postButton}>My Posts</span>
                <MyPostsReduxForm onSubmit={addPost}/>
                <div className={Style.posts}>
                    {posts}
                </div>
            </div>
        )
    }
)

