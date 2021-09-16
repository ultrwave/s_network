import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';
import {reducer as formReducer} from 'redux-form'
import settingsReducer from './settings-reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    pageProfile: profileReducer,
    pageDialogs: dialogsReducer,
    pageUsers: usersReducer,
    settings: settingsReducer,
    form: formReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
// @ts-ignore
window.store = store

export default store