import {combineReducers, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let reducers = combineReducers({
    pageProfile: profileReducer,
    pageDialogs: dialogsReducer
})


let store = createStore(reducers)

export default store