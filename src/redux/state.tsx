import {v1} from 'uuid';


//======== TYPES ======================================================

type StateType = {
    [pageName: string]: {
        [pageData: string]: any
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

//======== DATA ======================================================

const dialogItemId1 = v1()
const dialogItemId2 = v1()
const dialogItemId3 = v1()
const dialogItemId4 = v1()

const dialogItems: Array<DialogItemType> = [
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

const dialogsData: DialogsDataType = {
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

//====================================================================

type StoreType = {
    _state: StateType
    [key: string]: any
}

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const store: StoreType = {
    _state: {
        pageProfile: {
            postsData: [...postsData],
            newPostText: '',
        },
        pageDialogs: {
            dialogsData: dialogsData,
            dialogItems: [...dialogItems],
            newMessageText: 'Shift+click to send as friend',
        }
    },
    _callSubscriber(s: StateType) {
    },
    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    },

    dispatch(action: any) {
        if (action.type === ADD_POST) { // Add post (profile)
            let newPost: PostsDataType = {
                id: v1(),
                message: this._state.pageProfile.newPostText,
                likesCount: 0
            }
            this._state.pageProfile.postsData = [newPost, ...this._state.pageProfile.postsData]
            this._state.pageProfile.newPostText = ''
            this._callSubscriber(this._state)

        } else if (action.type === UPDATE_NEW_POST_TEXT) { // New post input
            this._state.pageProfile.newPostText = action.text
            this._callSubscriber(this._state)

        } else if (action.type === ADD_MESSAGE) { // Add message(dialogs)
            let newMessage: MessageDataType = {
                id: v1(),
                isMine: action.isMine,
                message: this._state.pageDialogs.newMessageText,
            }
            if (newMessage.message === 'Shift+click to send as friend') {
                newMessage.message = 'New Message!'
            }
            this._state.pageDialogs.dialogsData[action.dialogId] = [newMessage, ...this._state.pageDialogs.dialogsData[action.dialogId]]
            this._state.pageDialogs.newMessageText = ''
            this._callSubscriber(this._state)

        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) { // New message input
            this._state.pageDialogs.newMessageText = action.text
            this._callSubscriber(this._state)
        }
    }
}



export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        text: text
    }

}

export const addMessageActionCreator = (dialogId: string, isMine: boolean) => {
    return {
        type: ADD_MESSAGE,
        dialogId: dialogId,
        isMine: isMine
    }
}

export const updateNewMessageTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text
    }
}


export default store



