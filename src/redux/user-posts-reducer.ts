import {ActionTypes, PostsDataType} from '../types/types';
import {v1} from 'uuid';

const ADD_POSTS_DATA = 'sn01/userPostsData/ADD_POSTS_DATA'

type UserPostsStateType = {
    userId: string
    userPosts: Array<PostsDataType>
}[]

let initialState = [{
    userId: '13836',
    userPosts: [
        {id: v1(), message: '1 My Message', likesCount: 12, myLike: false, date: '1/10/2021, 23:04:56'},
        {id: v1(), message: '2 My Message', likesCount: 432, myLike: false, date: '1/10/2021, 23:04:56'},
        {id: v1(), message: '3 My Message', likesCount: 2, myLike: false, date: '1/10/2021, 23:04:56'}]
}]


const userPostsReducer = (state: UserPostsStateType = initialState, action: ActionTypes) => {

    switch (action.type) {

        case ADD_POSTS_DATA:
            console.log('action:')
            console.log(action)
            if (state.find(u => u.userId === String(action.userId))) {
                return [...state].map(
                    u => u.userId === action.userId? {...u, userPosts: action.postsData} : u)
            }
            return [...state, {userId: String(action.userId), userPosts: action.postsData}]

        default:
            return state
    }
}

export const addPostData = (userId: string, postsData: Array<PostsDataType>) => {
    return {
        type: ADD_POSTS_DATA,
        userId,
        postsData
    } as const
}

// todo - setPostsData thunk

export default userPostsReducer