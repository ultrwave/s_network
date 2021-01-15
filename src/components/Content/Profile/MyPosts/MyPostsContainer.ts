import {addPostAC, updateNewPostTextAC} from '../../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {StateType} from '../../../../types/types';

const mapStateToProps = (state: StateType) => {
    return state.pageProfile
}

const mapDispatchToProps = (dispatch: Function) => { // todo: fix type
    return {
        inputHandler: (text: string) => {
            dispatch(updateNewPostTextAC(text))
        },
        addPost: (ref: any) => {
            let text = ref.current?.value
            if (text && text.trim()) {
                dispatch(addPostAC())
                if (ref.current && ref.current.value) {
                    ref.current.focus()
                }
            }
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)