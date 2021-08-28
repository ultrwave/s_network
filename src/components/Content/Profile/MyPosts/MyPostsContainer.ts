import {
    addLikesAnimationThunk,
    addPost, deletePost,
    editPost,
    generateRandomPosts, loadPostsData,
    toggleMyLike
} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {StateType} from '../../../../types/types';

const mapStateToProps = (state: StateType) => {
    return state.pageProfile
}

export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    editPost,
    deletePost,
    loadPostsData,
    toggleMyLike,
    generateRandomPosts,
    addLikesAnimation: addLikesAnimationThunk
})(MyPosts)