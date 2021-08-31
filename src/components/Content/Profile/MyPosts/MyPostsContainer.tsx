import React, {useEffect} from 'react';
import {
    addLikesAnimationThunk,
    addPostThunk,
    deletePostThunk,
    editPostThunk,
    generateRandomPosts,
    toggleMyLikeThunk
} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {PostsDataType, StateType, UserProfileType} from '../../../../types/types';

type MyPostsContainerType = {
    postsData: PostsDataType
    profile: UserProfileType
    isOwner: boolean
    addPost(message: string): void
    editPost(postId: string, message: string): void
    deletePost(postId: string): void
    toggleMyLike(postId: string): void
    addLikesAnimation(postId: string, newLikesAmount: number): void
    generateRandomPosts(userId: string): void
}

const MyPostsContainer = (props: MyPostsContainerType) => {

    const userPosts = props.postsData[String(props.profile.userId)]
    const userId = props.profile.userId
    const friendsPage = !props.isOwner
    const emulatePosts = props.generateRandomPosts

    useEffect(() => { // generate random posts on friend's page
        if (friendsPage && userId !== '-1') {
            emulatePosts(userId)
        }
    }, [emulatePosts, friendsPage, userId])

    const {generateRandomPosts, postsData, ...restProps} = props
    const myPostsProps = {...restProps, posts: userPosts || []}

    return <MyPosts {...myPostsProps}/>
}

const mapStateToProps = (state: StateType) => {
    return state.pageProfile
}

export default connect(mapStateToProps, {
    addPost: addPostThunk,
    editPost: editPostThunk,
    deletePost: deletePostThunk,
    toggleMyLike: toggleMyLikeThunk,
    generateRandomPosts,
    addLikesAnimation: addLikesAnimationThunk
})(MyPostsContainer)
