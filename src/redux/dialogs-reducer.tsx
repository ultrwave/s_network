import {v1} from 'uuid';
import {
    ActionTypes,
    DialogItemType,
    DialogsDataType,
    MessageDataType,
    dialogsData,
    dialogItems
} from './store';

const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

type PageStateType = {
        dialogsData: DialogsDataType
        dialogItems: Array<DialogItemType>
        newMessageText: string
}

const initialState = {
    dialogsData: dialogsData,
    dialogItems: [...dialogItems],
    newMessageText: 'Shift+click to send as friend',
}

const dialogsReducer = (state: PageStateType = initialState, action: ActionTypes) => {

    switch (action.type) {

        case ADD_MESSAGE:
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

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.text
            return state

        default:
            return state
    }
}

export const addMessageAC = (dialogId: string, isMine: boolean) => {
    return {
        type: ADD_MESSAGE,
        dialogId: dialogId,
        isMine: isMine
    } as const
}

export const updateNewMessageTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        text: text
    } as const
}

export default dialogsReducer