import React, {ChangeEvent} from 'react';
import {
    ActionTypes,
    DialogItemType,
    DialogsDataType,
    StateType,
} from '../../../redux/store';
import {addMessageAC, updateNewMessageTextAC, setDialogIdAC} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';

type DialogsContentType = {
    data: {
        dialogItems: Array<DialogItemType>
        dialogsData: DialogsDataType
        newMessageText: string
    }
    dispatch: (action: ActionTypes) => void
}

const mapStateToProps = (state: StateType) => {
    return state.pageDialogs
}

const mapDispatchToProps = (dispatch: Function) => { // todo: fix type
    return {
        setDialogId: (id: string) => {
            dispatch(setDialogIdAC(id))
        },
        addMessage: (e: React.MouseEvent<HTMLButtonElement>, newMessageRef: any, dialogId: string) => {
            let text = newMessageRef.current?.value
            let isMine = true
            if (text && text.trim()) {
                if (e.shiftKey) {
                    isMine = false
                }
                dispatch(addMessageAC(dialogId, isMine))
                if (newMessageRef.current && newMessageRef.current.value) {
                    newMessageRef.current.focus()
                }
            }
        },
        inputHandler: () => (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(updateNewMessageTextAC(e.currentTarget.value))
        },
        focusHandler: () => (e: ChangeEvent<HTMLTextAreaElement>) => {
            if (e.currentTarget.value === 'Shift+click to send as friend') {
                dispatch(updateNewMessageTextAC(''))
            }
        },
        blurHandler: (e: ChangeEvent<HTMLTextAreaElement>) => {
            if (!e.currentTarget.value.trim()) {
                dispatch(updateNewMessageTextAC('Shift+click to send as friend'))
            }
        },
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)