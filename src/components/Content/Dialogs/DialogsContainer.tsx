import {addMessage, setDialogId, updateNewMessageText} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../../types/types';
import React from 'react';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';

const DialogsAuthRedirect = withAuthRedirect(Dialogs)

const mapStateToProps = (state: StateType) => {
    return {
        ...state.pageDialogs,
    }
}

export const DialogsContainer = connect(mapStateToProps, {
    updateNewMessageText,
    addMessage,
    setDialogId
})(DialogsAuthRedirect)