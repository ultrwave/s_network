import {combineReducers, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';

let reducers = combineReducers({
    pageProfile: profileReducer,
    pageDialogs: dialogsReducer,
    pageUsers: usersReducer,
})

let store = createStore(reducers)

export default store