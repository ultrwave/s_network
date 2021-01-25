import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow
} from '../redux/users-reducer';
import {addPost, setUserProfile, updateNewPostText} from '../redux/profile-reducer';
import {addMessage, setDialogId, updateNewMessageText} from '../redux/dialogs-reducer';
import {setAuthUserData} from '../redux/auth-reducer';
import {rootReducer} from '../redux/redux-store';
// todo - разбить на блоки /=======

export type RootReducerType = typeof rootReducer
export type StateType = ReturnType<RootReducerType>

export type StoreType = {
    _state: StateType
    _callSubscriber: (s: StateType) => void
    getState: () => StateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

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

export type UserType = {
    id: string
    name: string
    uniqueUrlName: string | null
    status: string | null
    photos: {
        small: string | null
        large: string | null
    }
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
    photos: {
        small: string | null
        large: string
    }
}

export type PageProfileActionType =
    ReturnType<typeof addPost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof setUserProfile>

export type PageDialogsActionType =
    ReturnType<typeof addMessage>
    | ReturnType<typeof updateNewMessageText>
    | ReturnType<typeof setDialogId>

export type UsersActionType =
    ReturnType<typeof toggleFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleFetching>

export type AuthActionType =
    ReturnType<typeof setAuthUserData>


export type ActionTypes =
    PageProfileActionType
    | PageDialogsActionType
    | UsersActionType
    | AuthActionType


