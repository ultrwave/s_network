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
        {id: v1(), message: 'It\'s my first post! (test)', likesCount: 12, myLike: false, date: '1/10/2021, 23:04:56'},
        {id: v1(), message: 'Test message 2', likesCount: 432, myLike: false, date: '1/10/2021, 23:04:56'},
        {id: v1(), message: 'Test 3', likesCount: 2, myLike: false, date: '1/10/2021, 23:04:56'}]
}]


const userPostsReducer = (state: UserPostsStateType = initialState, action: ActionTypes) => {

    switch (action.type) {

        case ADD_POSTS_DATA: {

            return state
        }
    }
}

export const addPostData = (userId: string, postsData: Array<PostsDataType>) => {
    return {
        type: ADD_POSTS_DATA,
        userId,
        postsData
    } as const
}


export default userPostsReducer