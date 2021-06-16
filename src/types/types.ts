import {
    setCurrentPage, setItemsOnPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow, toggleRequestIsInProgress
} from '../redux/users-reducer';
import {addPost, deletePost, setPhotoSuccess, setUserProfile, setUserStatus} from '../redux/profile-reducer';
import {addMessage, setDialogId} from '../redux/dialogs-reducer';
import {setAuthUserData, showCaptcha} from '../redux/auth-reducer';
import store, {rootReducer} from '../redux/redux-store';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {setInitialized} from '../redux/app-reducer';

export type RootReducerType = typeof rootReducer
export type StateType = ReturnType<RootReducerType>

export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, // todo fix any (изначально там void)
    StateType,
    unknown,
    Action<string>>

// export type StoreType = {
//     _state: StateType
//     _callSubscriber: (s: StateType) => void
//     getState: () => StateType
//     subscribe: (callback: () => void) => void
//     dispatch: (action: ActionTypes) => void
// }

// export type StateType = {
//     pageProfile: {
//         profile: UserProfileType | null
//         postsData: Array<PostsDataType>
//         newPostText: string
//     }
//     pageDialogs: {
//         dialogsData: DialogsDataType
//         dialogItems: Array<DialogItemType>
//         activeDialogId: string
//         newMessageText: string
//     }
//     pageUsers: {
//         users: Array<UserType>
//         pageSize: number
//         totalUsersCount: number
//         currentPage: number
//         isFetching: boolean
//     }
//     [key: string]: any
// }

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
    userId: string | number
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

export type AppDispatchType = typeof store.dispatch // ReturnType? todo - норм типизация?

export type PageProfileActionType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof setPhotoSuccess>

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
    | PageDialogsActionType
    | UsersActionType
    | AuthActionType
    | AppActionType



