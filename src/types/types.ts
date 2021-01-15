import {setUsersAC, toggleFollowAC} from '../redux/users-reducer';
import {addPostAC, updateNewPostTextAC} from '../redux/profile-reducer';
import {addMessageAC, setDialogIdAC, updateNewMessageTextAC} from '../redux/dialogs-reducer';

export type StoreType = {
    _state: StateType
    _callSubscriber: (s: StateType) => void
    getState: () => StateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

export type StateType = { // todo - заменить на typeof
    pageProfile: {
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
    }
}

export type UserType = {
    id: string
    firstName: string
    photoUrl: string
    status: string
    location: { city: string, country: string }
    isFollowed: boolean
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

export type PageProfileActionType =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC>

export type PageDialogsActionType =
    ReturnType<typeof addMessageAC> |
    ReturnType<typeof updateNewMessageTextAC> |
    ReturnType<typeof setDialogIdAC>

export type UsersActionType =
    ReturnType<typeof toggleFollowAC> |
    ReturnType<typeof setUsersAC>

export type ActionTypes =
    PageProfileActionType |
    PageDialogsActionType |
    UsersActionType