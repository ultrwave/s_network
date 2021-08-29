import React, {useEffect} from 'react';
import {
    addLikesAnimationThunk,
    addPost, clearPostsState,
    deletePost,
    editPost,
    generateRandomPosts,
    loadPostsData,
    toggleMyLike
} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {PostsDataType, StateType, UserProfileType} from '../../../../types/types';

export type MyPostsType = {
    postsData: Array<PostsDataType>
    profile: UserProfileType
    isOwner: boolean
    addPost(message: string): void
    editPost(postId: string, message: string): void
    deletePost(postId: string): void
    toggleMyLike(postId: string): void
    addLikesAnimation(postId: string, newLikesAmount: number): void
}

type MyPostsContainerType = {
    generateRandomPosts(userId: string): void
    loadPostsData(userId: string): void
    clearPostsState(): void
}

const MyPostsContainer = (props: MyPostsType & MyPostsContainerType) => {

    useEffect(() => { // generate random posts on friend's page
        props.loadPostsData(props.profile.userId)
        if (props.profile.fullName && !props.isOwner) {
            props.generateRandomPosts(props.profile.userId)
        }
        return props.clearPostsState
    }, [props.profile.userId, props.profile.fullName])

    const addPost = (message: string) => {
        props.addPost(message)
        props.loadPostsData(props.profile.userId)
    }

    const editPost = (postId: string, message: string) => {
        props.editPost(postId, message)
        props.loadPostsData(props.profile.userId)
    }

    const deletePost = (postId: string) => {
        props.deletePost(postId)
        props.loadPostsData(props.profile.userId)
    }

    const {generateRandomPosts, loadPostsData, clearPostsState, ...restProps} = props
    const myPostsProps = {...restProps, addPost, editPost, deletePost}

        return <MyPosts {...myPostsProps}/>
}


const mapStateToProps = (state: StateType) => {
    return state.pageProfile
}

export default connect(mapStateToProps, {
    addPost,
    editPost,
    deletePost,
    toggleMyLike,
    loadPostsData,
    clearPostsState,
    generateRandomPosts,
    addLikesAnimation: addLikesAnimationThunk
})(MyPostsContainer)
