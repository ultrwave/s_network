import {addMessage, updateNewMessageText, setDialogId} from '../../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../../types/types';

const mapStateToProps = (state: StateType) => {
    return state.pageDialogs
}

export const DialogsContainer = connect(mapStateToProps, {
    updateNewMessageText,
    addMessage,
    setDialogId
})(Dialogs)