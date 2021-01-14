import {v1} from 'uuid';
import profileReducer, {addPostAC, updateNewPostTextAC} from './profile-reducer';
import dialogsReducer, {addMessageAC, setDialogIdAC, updateNewMessageTextAC} from './dialogs-reducer';
import {setUsersAC, toggleFollowAC, UserType} from './users-reducer';


//======== TYPES ======================================================

export type StoreType = {
    _state: StateType
    _callSubscriber: (s: StateType) => void
    getState: () => StateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

export type StateType = {
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

//======== DATA ======================================================

const dialogItemId1 = v1()
const dialogItemId2 = v1()
const dialogItemId3 = v1()
const dialogItemId4 = v1()

export const dialogItems: Array<DialogItemType> = [
    {id: dialogItemId1, name: 'Friend 1'},
    {id: dialogItemId2, name: 'Friend 2'},
    {id: dialogItemId3, name: 'Friend 3'},
    {id: dialogItemId4, name: 'Friend 4'},
]

const dialogMessagesData1: Array<MessageDataType> = [
    {id: v1(), isMine: true, message: 'Hi!'},
    {id: v1(), isMine: false, message: 'Hello!'},
    {id: v1(), isMine: true, message: 'Whats up?'},
    {id: v1(), isMine: true, message: 'Good day!'},
    {id: v1(), isMine: false, message: 'Yo!'}
]

const dialogMessagesData2: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Apple'},
    {id: v1(), isMine: true, message: 'Peanut'},
    {id: v1(), isMine: false, message: 'Banana'},
    {id: v1(), isMine: true, message: 'Peach'},
]

const dialogMessagesData3: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Tomato'},
    {id: v1(), isMine: false, message: 'Cucumber'},
    {id: v1(), isMine: true, message: 'Carrot'},
]

const dialogMessagesData4: Array<MessageDataType> = [
    {id: v1(), isMine: false, message: 'Winter'},
    {id: v1(), isMine: false, message: 'Spring'},
]

export const dialogsData: DialogsDataType = {
    [dialogItemId1]: dialogMessagesData1,
    [dialogItemId2]: dialogMessagesData2,
    [dialogItemId3]: dialogMessagesData3,
    [dialogItemId4]: dialogMessagesData4
}

const postsData: Array<PostsDataType> = [
    {id: v1(), message: 'It\'s my first post!', likesCount: 12},
    {id: v1(), message: 'Hello!', likesCount: 432},
    {id: v1(), message: 'Good day!', likesCount: 2}
]

//========= STORE =====================================================

const store: StoreType = {
    _state: {
        pageProfile: {
            postsData: [...postsData],
            newPostText: '',
        },
        pageDialogs: {
            dialogsData: dialogsData,
            dialogItems: [...dialogItems],
            activeDialogId: [...dialogItems][0].id,
            newMessageText: 'Shift+click to send as friend',
        },
       pageUsers: {
           users: [
               {
                   id: v1(),
                   firstName: 'StoreDmitry',
                   photoUrl: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
                   status: 'one two three',
                   location: {city: 'Minsk', country: 'Belarus'},
                   isFollowed: false
               },
               {
                   id: v1(),
                   firstName: 'StoreEgor',
                   photoUrl: 'https://i.dlpng.com/static/png/6728131_preview.png',
                   status: 'hey hey hey',
                   location: {city: 'Moscow', country: 'Russia'},
                   isFollowed: false
               },
           ],
       }
    },
    _callSubscriber(s: StateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    dispatch(action: ActionTypes) {

        this._state.pageProfile = profileReducer({...this._state.pageProfile}, action)
        this._state.pageDialogs = dialogsReducer({...this._state.pageDialogs}, action)

        this._callSubscriber(this._state)

    }
}

export default store



