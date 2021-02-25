import {addMessage, setDialogId} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../../types/types';
import React from 'react';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => {
    return {
        ...state.pageDialogs
    }
}

export default compose<React.ComponentType >(
    connect(
        mapStateToProps,
        {
            addMessage,
            setDialogId
        }),
    withAuthRedirect
)(Dialogs)
