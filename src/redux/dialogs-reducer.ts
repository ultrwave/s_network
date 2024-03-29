import {v1} from 'uuid';
import {ActionTypes, DialogItemType, DialogsDataType, MessageDataType} from '../types/types';
import {dialogItems, dialogsData} from './app-store';

const ADD_MESSAGE = 'sn01/dialogs/ADD_MESSAGE'
const SET_DIALOG_ID = 'sn01/dialogs/SET_DIALOG_ID'

type PageStateType = {
    dialogsData: DialogsDataType
    dialogItems: Array<DialogItemType>
    activeDialogId: string
}

const initialState = {
    dialogsData: dialogsData,
    dialogItems: [...dialogItems],
    activeDialogId: [...dialogItems][0].id,
}

const dialogsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case ADD_MESSAGE:

            let newMessage: MessageDataType = {
                id: v1(),
                isMine: action.payload.isMine,
                message: (action.payload.message && action.payload.message.trim())
                    ? action.payload.message
                    : 'Test message',
            }

            return {
                ...state,
                dialogsData: {
                    ...state.dialogsData,
                    [action.payload.dialogId]: [newMessage, ...state.dialogsData[action.payload.dialogId]]
                }
            }

        case SET_DIALOG_ID:
            return {
                ...state,
                activeDialogId: action.payload.id
            }

        default:
            return state
    }
}

export const addMessage = (payload: {dialogId: string, message: string, isMine: boolean}) => {
    return {type: ADD_MESSAGE, payload} as const
}

export const setDialogId = (payload: {id: string}) => {
    return {type: SET_DIALOG_ID, payload} as const
}

export default dialogsReducer