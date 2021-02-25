import {v1} from 'uuid';
import {ActionTypes, AppDispatchType, PostsDataType, UserProfileType} from '../types/types';
import profileAvatarPlaceholder from '../assets/images/profile_avatar_placeholder.jpg'
import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'

type PageStateType = {
    postsData: Array<PostsDataType>
    profile: UserProfileType
    status: string
}

const defaultUser: UserProfileType = {
    userId: 0,
    fullName: '',
    aboutMe: null,
    lookingForAJob: false,
    lookingForAJobDescription: null,
    contacts: {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
    },
    photos: {
        large: profileAvatarPlaceholder,
        small: null
    }
}

let initialState = {
    profile: defaultUser,
    postsData: [
        {id: v1(), message: 'It\'s my first post!', likesCount: 12},
        {id: v1(), message: 'Hello!', likesCount: 432},
        {id: v1(), message: 'Good day!', likesCount: 2}
    ],
    status: ''
}

const profileReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USER-PROFILE' :
            const newProfile = {...action.profile}
            if (!newProfile.photos.large) {
                newProfile.photos.large = profileAvatarPlaceholder
            }
            return {...state, profile: newProfile}

        case 'SET-USER-STATUS' :
            return {...state, status: action.status}

        case 'ADD-POST':

            let newPost: PostsDataType = {
                id: v1(),
                message: action.message? action.message : 'Test message',
                likesCount: Math.round(Math.random()*1000)
            }
            let newState = {...state}
            newState.postsData = [newPost, ...state.postsData]
            return newState

        default:
            return state
    }
}

export const addPost = (message: string) => {
    return {
        type: ADD_POST,
        message
    } as const
}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const setUserStatus = (status: string) => {
    return {
        type: SET_USER_STATUS,
        status
    } as const
}

// Thunks

export const getProfileThunk = (userId: string) => (dispatch: AppDispatchType) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export const getStatusThunk = (userId: string) => (dispatch: AppDispatchType) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatus(response.data))
        })
}

export const updateStatusThunk = (status: string) => (dispatch: AppDispatchType) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
}

export default profileReducer