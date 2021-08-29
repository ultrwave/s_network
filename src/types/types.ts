import {
    setCurrentPage,
    setItemsOnPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow,
    toggleRequestIsInProgress
} from '../redux/users-reducer';
import {
    addPost, clearPostsState, createPost,
    deletePost, editPost,
    savePhotoSuccess, setLikes, setOwner,
    setUserProfile,
    setUserStatus,
    toggleMyLike
} from '../redux/profile-reducer';
import {addMessage, setDialogId} from '../redux/dialogs-reducer';
import {setAuthUserData, showCaptcha} from '../redux/auth-reducer';
import {rootReducer} from '../redux/redux-store';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {setInitialized} from '../redux/app-reducer';
import {addPostData} from '../redux/user-posts-reducer';

export type RootReducerType = typeof rootReducer
export type StateType = ReturnType<RootReducerType>

export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, // todo fix any (изначально там void)
    StateType,
    unknown,
    Action<string>>

export type DialogsDataType = {
    [id: string]: Array<MessageDataType>
}

export type DialogItemType = {
    id: string
    name: string
}

export type MessageDataType = {
    id: string
    isMine: boolean
    message: string
}

export type PostsDataType = {
    id: string
    message: string
    likesCount: number
    myLike: boolean
    date: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    id: string
    name: string
    uniqueUrlName: string | null
    status: string | null
    photos: PhotosType
    followed: boolean
}

export type UserProfileType = {
    userId: string
    fullName: string
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    },
    photos: PhotosType
}

export type PageProfileActionType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof createPost>
    | ReturnType<typeof clearPostsState>
    | ReturnType<typeof editPost>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof toggleMyLike>
    | ReturnType<typeof setLikes>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setOwner>
    | ReturnType<typeof savePhotoSuccess>

export type UserPostsDataActionType =
    |ReturnType<typeof addPostData>

export type PageDialogsActionType =
    | ReturnType<typeof addMessage>
    | ReturnType<typeof setDialogId>

export type UsersActionType =
    | ReturnType<typeof toggleFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setItemsOnPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleFetching>
    | ReturnType<typeof toggleRequestIsInProgress>

export type AuthActionType =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof showCaptcha>

export type AppActionType =
    | ReturnType<typeof setInitialized>

export type ActionTypes =
    | PageProfileActionType
    | UserPostsDataActionType
    | PageDialogsActionType
    | UsersActionType
    | AuthActionType
    | AppActionType



