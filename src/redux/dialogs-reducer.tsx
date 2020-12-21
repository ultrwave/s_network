import {v1} from 'uuid';
import {
    ActionTypes,
    DialogItemType,
    DialogsAddMessageActionType,
    DialogsDataType,
    DialogsUpdateNewMessageTextActionType,
    MessageDataType
} from './state';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

type PageStateType = {
        dialogsData: DialogsDataType
        dialogItems: Array<DialogItemType>
        newMessageText: string
}

const dialogsReducer = (state: PageStateType, action: ActionTypes) => {

    switch (action.type) {

        case ADD_MESSAGE: // Add message(dialogs)
            let newMessage: MessageDataType = {
                id: v1(),
                isMine: action.isMine,
                message: state.newMessageText,
            }
            if (newMessage.message === 'Shift+click to send as friend') {
                newMessage.message = 'New Message!'
            }
            state.dialogsData[action.dialogId] = [newMessage, ...state.dialogsData[action.dialogId]]
            state.newMessageText = ''
            return state

        case UPDATE_NEW_MESSAGE_TEXT: // New message input
            state.newMessageText = action.text
            return state

        default:
            return state
    }
}

export const addMessageActionCreator = (dialogId: string, isMine: boolean): DialogsAddMessageActionType => {
    return {
        type: ADD_MESSAGE,
        dialogId: dialogId,
        isMine: isMine
    }
}

export const updateNewMessageTextActionCreator = (text: string): DialogsUpdateNewMessageTextActionType => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text
    }
}

export default dialogsReducer