import {v1} from 'uuid';
import {ActionTypes, AppThunk, PhotosType, PostsDataType, UserProfileType} from '../types/types';
import profileAvatarPlaceholder from '../assets/images/profile_avatar_placeholder.jpg'
import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const CREATE_POST = 'sn01/profile/CREATE_POST'
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
    postsData: Array<PostsDataType>
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

let initialState = {
    profile: defaultUser,
    postsData: [],
    status: '',
    isOwner: false
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

        case SET_OWNER :
            return {...state, isOwner: action.isOwner}

        case CREATE_POST:
            let postsData = state.postsData
            postsData.push(action.post)
            return {...state, postsData}

        case ADD_POST: {
            let newPost: PostsDataType = {
                id: v1(),
                message: (action.message && action.message.trim()) ? action.message : 'Test message',
                likesCount: Math.round(Math.random() * 1000),
                myLike: false,
                date: (new Date()).toLocaleString([], {hour12: false} as any)
            }
            let newState = {...state}
            newState.postsData = [newPost, ...state.postsData]
            return newState
        }

        case EDIT_POST:
            return {
                ...state,
                postsData: state.postsData.map(p =>
                    p.id === action.postId ? {...p, message: action.message} : p
                )
            }

        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.id)
            }

        case TOGGLE_MY_LIKE: {
            return {
                ...state,
                postsData: state.postsData.map(p =>
                    p.id === action.postId ? {...p, myLike: !p.myLike} : p
                )
            }
        }

        case SET_LIKES: {
            return {
                ...state,
                postsData: state.postsData.map(p =>
                    p.id === action.postId ? {...p, likesCount: action.likesAmount} : p
                )
            }
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

export const createPost = (post: PostsDataType) => {
    return {
        type: CREATE_POST,
        post
    } as const
}

export const addPost = (message: string) => {
    return {
        type: ADD_POST,
        message
    } as const
}

export const editPost = (postId: string, message: string) => { // todo - action payloads
    return {
        type: EDIT_POST,
        postId,
        message
    } as const
}

export const deletePost = (id: string) => {
    return {
        type: DELETE_POST,
        id
    } as const
}

export const toggleMyLike = (postId: string) => {
    return {
        type: TOGGLE_MY_LIKE,
        postId
    } as const
}

export const setLikes = (postId: string, likesAmount: number) => {
    return {
        type: SET_LIKES,
        postId,
        likesAmount
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

export const setOwner = (isOwner: boolean) => {
    return {
        type: SET_OWNER,
        isOwner
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
    dispatch(loadPostsData(userId))
}

export const getStatusThunk = (userId: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data))
}

export const updateStatusThunk = (status: string): AppThunk => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    } catch (error) {
        console.warn(error)
    }
}

export const generateRandomPosts = (): AppThunk => async (dispatch) => {
    let newPostsAmount = Math.floor(Math.random() * 10 + 1)
    while (newPostsAmount > 0) {
        const randomText = `GENERATED ${newPostsAmount}` // todo - add generator
        dispatch(addPost(randomText))
        newPostsAmount--
    }
}

export const loadPostsData = (userId: string): AppThunk => async(dispatch, getState) => {
    const user = getState().userPostsData.find(u => u.userId === userId)
    if (user) {
        user.userPosts.forEach(p => dispatch(createPost(p)))
    }
}

export const addLikesAnimationThunk = (postId: string, newLikesAmount: number): AppThunk => (dispatch, getState) => {
    const postsData = getState().pageProfile.postsData
    const post = postsData.length && postsData.find(p => p.id === postId)
    if (post) {
        const currentLikes = post.likesCount
        dispatch(setLikes(
            postId, currentLikes + (post.myLike ? -newLikesAmount : newLikesAmount))
        )
    }
}

export const savePhotoThunk = (file: File): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
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