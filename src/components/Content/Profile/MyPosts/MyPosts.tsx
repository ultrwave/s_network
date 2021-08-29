import React from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {MyPostsReduxForm} from './MyPostsForm';
import {MyPostsType} from './MyPostsContainer';

export const MyPosts = React.memo((props: MyPostsType) => { // todo - destructure props
    console.log('mp')
    console.log(props)
    const fullName = props.profile.fullName || 'loading'
    const userNameCapital = (fullName[0].toUpperCase() + fullName.slice(1)).split(' ')[0]
    const addLikes = (postId: string, newLikesAmount: number) => {
        props.addLikesAnimation(postId, newLikesAmount)
        props.toggleMyLike(postId)
    }

        const posts = props.postsData.map((p, i) =>
            <Post key={p.id}
                  postId={p.id}
                  message={p.message}
                  isOwner={props.isOwner}
                  likesCount={p.likesCount}
                  myLike={p.myLike}
                  date={p.date}
                  toggleMyLike={(newLikes: number) => addLikes(p.id, newLikes)}
                  editPost={props.editPost}
                  deletePost={props.deletePost}
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

