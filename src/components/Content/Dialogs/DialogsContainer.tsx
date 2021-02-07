import {addMessage, updateNewMessageText, setDialogId} from '../../../redux/dialogs-reducer';
import {Dialogs, DialogsContentType} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../../types/types';
import {Redirect} from 'react-router-dom';
import React from 'react';

const DialogsAuthRedirect = (props: DialogsContentType) => {
    return !props.isAuth ?
        <Redirect to='/login'/>
        : <Dialogs {...props} />
}

const mapStateToProps = (state: StateType) => {
    return {
        ...state.pageDialogs,
        isAuth: state.auth.isAuth
    }
}

export const DialogsContainer = connect(mapStateToProps, {
    updateNewMessageText,
    addMessage,
    setDialogId
})(DialogsAuthRedirect)