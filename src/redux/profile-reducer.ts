import {v1} from 'uuid';
import {ActionTypes, PostsDataType} from '../types/types';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

type PageStateType = {
    postsData: Array<PostsDataType>
    newPostText: string
}

let initialState = {
    postsData: [
        {id: v1(), message: 'It\'s my first post!', likesCount: 12},
        {id: v1(), message: 'Hello!', likesCount: 432},
        {id: v1(), message: 'Good day!', likesCount: 2}
    ],
    newPostText: ''
}

const profileReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'ADD-POST': // Add post (profile)

            let newPost: PostsDataType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            let newState = {...state}
            newState.postsData = [newPost, ...state.postsData]
            newState.newPostText = ''
            return newState

        case 'UPDATE-NEW-POST-TEXT': // New post input
            return {
                ...state,
                newPostText: action.text
            }

        default:
            return state
    }
}

export const addPostAC = () => {
    return {
        type: ADD_POST,
    } as const
}

export const updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    } as const

}

export default profileReducer