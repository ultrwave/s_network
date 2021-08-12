import {addPost, toggleMyLike} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {StateType} from '../../../../types/types';

const mapStateToProps = (state: StateType) => {
    return state.pageProfile
}

export const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    toggleMyLike
})(MyPosts)