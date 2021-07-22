import {v1} from 'uuid';
import {ActionTypes, AppThunk, PhotosType, PostsDataType, UserProfileType} from '../types/types';
import profileAvatarPlaceholder from '../assets/images/profile_avatar_placeholder.jpg'
import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'sn01/profile/ADD-POST'
const DELETE_POST = 'sn01/profile/DELETE-POST'
const SET_USER_PROFILE = 'sn01/profile/SET-USER-PROFILE'
const SET_USER_STATUS = 'sn01/profile/SET-USER-STATUS'
const SET_PHOTO_SUCCESS = 'sn01/profile/SAVE-PHOTO-SUCCESS'

type PageStateType = {
    postsData: Array<PostsDataType>
    profile: UserProfileType
    status: string
}

export const defaultUser: UserProfileType = {
    userId: '2', // todo - fix default
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

        case SET_USER_PROFILE :
            const newProfile = {...action.profile}
            if (!newProfile.photos.large) {
                newProfile.photos.large = profileAvatarPlaceholder
            }
            return {...state, profile: newProfile}

        case SET_USER_STATUS :
            return {...state, status: action.status}

        case ADD_POST: {
            let newPost: PostsDataType = {
                id: v1(),
                message: (action.message && action.message.trim()) ? action.message : 'Test message',
                likesCount: Math.round(Math.random() * 1000)
            }
            let newState = {...state}
            newState.postsData = [newPost, ...state.postsData]
            return newState
        }

        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.id)
            }

        case SET_PHOTO_SUCCESS: {
            const newState = {...state}
            newState.profile.photos = action.photos
            return newState
        }

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

export const deletePost = (id: string) => {
    return {
        type: DELETE_POST,
        id
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

export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: SET_PHOTO_SUCCESS,
        photos
    } as const
}

// Thunks

export const getProfileThunk = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data))
}

export const getStatusThunk = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data))
}

export const updateStatusThunk = (status: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhotoThunk = (file: File): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileThunk = (profile: UserProfileType): AppThunk => async(dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunk(userId || '2'))
        // todo - сделать default user id для неавторизованного юзера
    } else {
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'unknown error'
        let action = stopSubmit('edit-profile', {_error: message})
        dispatch(action)
    }
}

export default profileReducer