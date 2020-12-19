import {v1} from 'uuid';
import {MessageDataType} from './state';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const dialogsReducer = (state: any, action: any) => {

    if (action.type === ADD_MESSAGE) { // Add message(dialogs)
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

    } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) { // New message input
        state.newMessageText = action.text
    }

    return state
}

export default dialogsReducer