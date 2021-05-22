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

export class MyPosts extends React.Component<MyPostsType> {

    shouldComponentUpdate(nextProps: Readonly<MyPostsType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }

    render() {

        const posts = this.props.postsData.map(p =>
            <Post key={p.id}
                  message={p.message}
                  likesCount={p.likesCount}
                  avatar={this.props.profile.photos.large}
            />)

        const addPost = (values: { message: string }) => {
            this.props.addPost(values.message)
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
}

