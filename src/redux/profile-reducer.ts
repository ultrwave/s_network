import {v1} from 'uuid';
import {ActionTypes, AppDispatchType, PostsDataType, UserProfileType} from '../types/types';
import profileAvatarPlaceholder from '../assets/images/profile_avatar_placeholder.jpg'
import {appAPI, profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

type PageStateType = {
    postsData: Array<PostsDataType>
    newPostText: string
    profile: UserProfileType
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
    newPostText: ''
}

const profileReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-USER-PROFILE' :
            const newProfile = {...action.profile}
            if (!newProfile.photos.large) {
                newProfile.photos.large = profileAvatarPlaceholder
            }
            return {...state, profile: newProfile}

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

export const addPost = () => {
    return {
        type: ADD_POST,
    } as const
}

export const updateNewPostText = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text
    } as const

}

export const setUserProfile = (profile: UserProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const

}

// Thunks

export const getProfileThunk = (userId: string) => (dispatch: AppDispatchType) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}

export default profileReducer