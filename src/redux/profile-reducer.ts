import {v1} from 'uuid';
import {ActionTypes, AppThunk, PhotosType, PostsDataType, PostType, UserProfileType} from '../types/types';
import profileAvatarPlaceholder from '../assets/images/profile_avatar_placeholder.jpg'
import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {generateMessage} from '../components/Content/Profile/MyPosts/messageGenerator';

const ADD_POST = 'sn01/profile/ADD_POST'
const SET_OWNER = 'sn01/profile/SET_OWNER'
const EDIT_POST = 'sn01/profile/EDIT_POST'
const DELETE_POST = 'sn01/profile/DELETE_POST'
const TOGGLE_MY_LIKE = 'sn01/profile/TOGGLE_MY_LIKE'
const SET_LIKES = 'sn01/profile/SET_LIKES'
const SET_USER_PROFILE = 'sn01/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'sn01/profile/SET_USER_STATUS'
const SET_PHOTO_SUCCESS = 'sn01/profile/SAVE_PHOTO_SUCCESS'

type PageStateType = {
    postsData: PostsDataType
    profile: UserProfileType
    status: string
    isOwner: boolean
}

export const defaultUser: UserProfileType = {
    userId: '-1',
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

let initialPostsData: PostsDataType = {
    '13836': [
        {
            postId: v1(), message: '1 My Message',
            likesCount: 12, myLike: false, date: '1/10/2021, 23:04:56'
        },
        {
            postId: v1(), message: '2 My Message',
            likesCount: 432, myLike: false, date: '1/10/2021, 23:04:56'
        },
        {
            postId: v1(), message: '3 My Message',
            likesCount: 2, myLike: false, date: '1/10/2021, 23:04:56'
        }]
}

let initialState = {
    profile: defaultUser,
    postsData: initialPostsData,
    status: '',
    isOwner: false
}

const profileReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case SET_USER_PROFILE :
            const newProfile = {...action.payload.profile}
            if (!newProfile.photos.large) {
                newProfile.photos.large = profileAvatarPlaceholder
            }
            return {...state, profile: newProfile}

        case SET_USER_STATUS :
            return {...state, status: action.payload.status}

        case SET_OWNER :
            return {...state, isOwner: action.payload.isOwner}

        case ADD_POST: {
            const newPost: PostType = {
                postId: v1(),
                message: (action.payload.message && action.payload.message.trim()) ? action.payload.message : 'Test message',
                likesCount: Math.round(Math.random() * 1000),
                myLike: false,
                date: (new Date()).toLocaleString([], {hour12: false} as any)
            }
            const posts = state.postsData[action.payload.userId] || []
            return {
                ...state,
                postsData: {
                    ...state.postsData, [action.payload.userId]: [newPost].concat(posts)
                }
            }

        }

        case EDIT_POST:
            return {
                ...state,
                postsData: {
                    ...state.postsData, [action.payload.userId]: state.postsData[action.payload.userId]
                        .map(p =>
                            p.postId === action.payload.postId
                                ? {...p, message: action.payload.message}
                                : p
                        )
                }
            }

        case DELETE_POST:
            return {
                ...state,
                postsData: {
                    ...state.postsData, [action.payload.userId]: state.postsData[action.payload.userId]
                        .filter(p =>
                            p.postId !== action.payload.postId)
                }
            }

        case TOGGLE_MY_LIKE:
            return {
                ...state,
                postsData: {
                    ...state.postsData, [action.payload.userId]: state.postsData[action.payload.userId]
                        .map(p =>
                            p.postId === action.payload.postId
                                ? {...p, myLike: !p.myLike}
                                : p
                        )
                }
            }

        case SET_LIKES:
            return {
                ...state,
                postsData: {
                    ...state.postsData, [action.payload.userId]: state.postsData[action.payload.userId]
                        .map(p =>
                            p.postId === action.payload.postId
                                ? {...p, likesCount: action.payload.likesAmount}
                                : p
                        )
                }
            }

        case SET_PHOTO_SUCCESS: {
            const newState = {...state}
            newState.profile.photos = action.payload.photos
            return newState
        }

        default:
            return state
    }
}

export const addPost = (payload: {userId: string, message: string}) => {
    return {type: ADD_POST, payload} as const
}

export const editPost = (payload: {userId: string, postId: string, message: string}) => {
    return {type: EDIT_POST, payload} as const
}

export const deletePost = (payload: {userId: string, postId: string}) => {
    return {type: DELETE_POST, payload} as const
}

export const toggleMyLike = (payload: {userId: string, postId: string}) => {
    return {type: TOGGLE_MY_LIKE, payload} as const
}

export const setLikes = (payload: {userId: string, postId: string, likesAmount: number}) => {
    return {type: SET_LIKES, payload} as const
}

export const setUserProfile = (payload: {profile: UserProfileType}) => {
    return {type: SET_USER_PROFILE, payload} as const
}

export const setUserStatus = (payload: {status: string}) => {
    return {type: SET_USER_STATUS, payload} as const
}

export const setOwner = (payload: {isOwner: boolean}) => {
    return {type: SET_OWNER, payload} as const
}

export const savePhotoSuccess = (payload: {photos: PhotosType}) => {
    return {type: SET_PHOTO_SUCCESS, payload} as const
}

// Thunks

export const addPostThunk = (message: string): AppThunk => (dispatch, getState) => {
    const userId = getState().pageProfile.profile.userId
    dispatch(addPost({userId, message}))
}

export const deletePostThunk = (postId: string): AppThunk => (dispatch, getState) => {
    const userId = getState().pageProfile.profile.userId
    dispatch(deletePost({userId, postId}))
}

export const editPostThunk = (postId: string, message: string): AppThunk => (dispatch, getState) => {
    const userId = getState().pageProfile.profile.userId
    dispatch(editPost({userId, postId, message}))
}

export const toggleMyLikeThunk = (postId: string): AppThunk => (dispatch, getState) => {
    const userId = getState().pageProfile.profile.userId
    dispatch(toggleMyLike({userId, postId}))
}

export const getProfileThunk = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile({profile: response.data}))
}

export const getStatusThunk = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus({status: response.data}))
}

export const updateStatusThunk = (status: string): AppThunk => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus({status}))
        }
    } catch (error) {
        console.warn(error)
    }
}

export const generateRandomPosts = (userId: string): AppThunk => async (dispatch, getState) => {
    const postsData = getState().pageProfile.postsData
    const name = getState().pageProfile.profile.fullName
    userId = String(userId)
    if (!postsData[userId]) {
        let newPostsAmount = Math.floor(Math.random() * 10 + 1)
        while (newPostsAmount > 0) {
            const randomText = generateMessage(name)
            dispatch(addPost({userId, message: randomText}))
            newPostsAmount--
        }
    }
}

export const addLikesAnimationThunk = (postId: string, newLikesAmount: number): AppThunk => (dispatch, getState) => {
    const userId = getState().pageProfile.profile.userId
    const postsData = getState().pageProfile.postsData[userId]
    const post = postsData.find(p => p.postId === postId)
    if (post) {
        const currentLikes = post.likesCount
        dispatch(setLikes(
            {userId, postId,
                likesAmount: currentLikes + (post.myLike ? -newLikesAmount : newLikesAmount)})
        )
    }
}

export const savePhotoThunk = (file: File): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess({photos: response.data.data.photos}))
    }
}

export const saveProfileThunk = (profile: UserProfileType): AppThunk => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunk(userId || '-1'))
    } else {
        const message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'unknown error'
        let error = message
            .split('>')[1]
            .split('')
            .filter((s: string) => s !== ')' && s !== ' ')
            .join('')
        error = error[0].toLowerCase() + error.slice(1)
        const action = stopSubmit(
            'edit-profile',
            {contacts: {[error]: message.split(' format')[0]}}
        )
        dispatch(action)
        return Promise.reject(message)
    }
}

export default profileReducer