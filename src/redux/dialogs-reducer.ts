import {v1} from 'uuid';
import {ActionTypes, DialogItemType, DialogsDataType, MessageDataType} from '../types/types';
import {dialogItems, dialogsData} from './store';

const ADD_MESSAGE = 'ADD-MESSAGE'
const SET_DIALOG_ID = 'SET-DIALOG-ID'

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
                isMine: action.isMine,
                message: action.message.trim()? action.message : 'Test message'
            }

            return {
                ...state,
                dialogsData: {
                    ...state.dialogsData,
                    [action.dialogId]: [newMessage, ...state.dialogsData[action.dialogId]]
                }
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

export const addMessage = (dialogId: string, message: string, isMine: boolean) => {
    return {
        type: ADD_MESSAGE,
        dialogId,
        message,
        isMine
    } as const
}

export const setDialogId = (id: string) => {
    return {
        type: SET_DIALOG_ID,
        id
    } as const
}

export default dialogsReducer