import React, {useEffect} from 'react';
import Style from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostsDataType, UserProfileType} from '../../../../types/types';
import {MyPostsReduxForm} from './MyPostsForm';
import {loadPostsData} from '../../../../redux/profile-reducer';

type MyPostsType = {
    postsData: Array<PostsDataType>
    profile: UserProfileType
    isOwner: boolean
    addPost(message: string): void
    editPost(postId: string, message: string): void
    deletePost(postId: string): void
    loadPostsData(userId: string): void
    toggleMyLike(postId: string): void
    generateRandomPosts(userId: string): void
    addLikesAnimation(postId: string, newLikesAmount: number): void
}

export const MyPosts = React.memo((props: MyPostsType) => { // todo - destructure props

    const fullName = (props.profile.fullName && props.profile.fullName) || 'loading'
    const userNameCapital = (fullName[0].toUpperCase() + fullName.slice(1)).split(' ')[0]
    const addLikes = (postId: string, newLikesAmount: number) => {
        props.addLikesAnimation(postId, newLikesAmount)
        props.toggleMyLike(postId)
    }

    useEffect(() => { // todo - add states for visited pages
        props.postsData.forEach(p => props.deletePost(p.id))
        if (fullName !== 'loading' && !props.isOwner) { // generate random posts on friend's page
            console.log('props:')
            console.log(props)
            props.generateRandomPosts(props.profile.userId)

        }
        props.loadPostsData(props.profile.userId)

    }, [props.profile.userId, fullName])

        const posts = props.postsData.map((p, i) =>
            <Post key={i}
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

