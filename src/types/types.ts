import {
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollow
} from '../redux/users-reducer';
import {addPostAC, setUserProfile, updateNewPostTextAC} from '../redux/profile-reducer';
import {addMessageAC, setDialogIdAC, updateNewMessageTextAC} from '../redux/dialogs-reducer';
// todo - разбить на блоки /=======
export type StoreType = {
    _state: StateType
    _callSubscriber: (s: StateType) => void
    getState: () => StateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

export type StateType = { // todo - заменить на typeof
    pageProfile: {
        profile: UserProfileType | null
        postsData: Array<PostsDataType>
        newPostText: string
    }
    pageDialogs: {
        dialogsData: DialogsDataType
        dialogItems: Array<DialogItemType>
        activeDialogId: string
        newMessageText: string
    }
    pageUsers: {
        users: Array<UserType>
        pageSize: number
        totalUsersCount: number
        currentPage: number
        isFetching: boolean
    }
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

export type UserProfileType = {
    aboutMe: string | null
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
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    userId: string | number
    photos: {
        small: string | null
        large: string | null
    }
}

export type PageProfileActionType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof setUserProfile>

export type PageDialogsActionType =
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC> |
    ReturnType<typeof setDialogIdAC>

export type UsersActionType =
    ReturnType<typeof toggleFollow> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleFetching>


export type ActionTypes =
    PageProfileActionType |
    PageDialogsActionType |
    UsersActionType