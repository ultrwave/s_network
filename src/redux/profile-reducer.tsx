import {v1} from 'uuid';
import {PostsDataType} from './state';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const profileReducer = (state: any, action: any) => {

    if (action.type === ADD_POST) { // Add post (profile)
        let newPost: PostsDataType = {
            id: v1(),
            message: state.newPostText,
            likesCount: 0
        }
        state.postsData = [newPost, ...state.postsData]
        state.newPostText = ''

    } else if (action.type === UPDATE_NEW_POST_TEXT) { // New post input
        state.newPostText = action.text
    }
    return state
}

export default profileReducer