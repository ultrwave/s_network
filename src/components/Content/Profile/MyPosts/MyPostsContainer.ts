import {
    addLikesAnimationThunk,
    addPost, deletePost,
    editPost,
    generateRandomPosts,
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
    toggleMyLike,
    generateRandomPosts,
    addLikesAnimation: addLikesAnimationThunk
})(MyPosts)