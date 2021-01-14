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
const SET_DIALOG_ID = 'SET-DIALOG-ID'

type PageStateType = {
        dialogsData: DialogsDataType
        dialogItems: Array<DialogItemType>
        newMessageText: string
        activeDialogId: string
}

const initialState = {
    dialogsData: dialogsData,
    dialogItems: [...dialogItems],
    activeDialogId: [...dialogItems][0].id,
    newMessageText: 'Shift+click to send as friend',
}

const dialogsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

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
            let newState = {...state} // todo - как написать без создания новой переменной?
            newState.dialogsData[action.dialogId] = [newMessage, ...newState.dialogsData[action.dialogId]]
            newState.newMessageText = ''
            return newState


        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.text
            }

        case SET_DIALOG_ID:
            return {
                ...state,
                activeDialogId: action.id
            }

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

export const setDialogIdAC = (id: string) => {
    return {
        type: SET_DIALOG_ID,
        id: id
    } as const
}

export default dialogsReducer