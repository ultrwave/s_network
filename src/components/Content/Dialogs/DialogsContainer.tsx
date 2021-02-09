import {addMessage, setDialogId, updateNewMessageText} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../../types/types';
import React from 'react';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => {
    return {
        ...state.pageDialogs,
    }
}

export default compose(
    connect(
        mapStateToProps,
        {
            updateNewMessageText,
            addMessage,
            setDialogId
        }),
    withAuthRedirect
)(Dialogs) as React.ComponentType // todo - что делает этот as?