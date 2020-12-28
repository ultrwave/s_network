import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StateType} from './redux/store';
import store from './redux/redux-store'
import StoreContext from './StoreContext';

export const globalRender = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <StoreContext.Provider value={store}>
                <App
                    // state={state}
                    // dispatch={store.dispatch.bind(store)}
                />
            </StoreContext.Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

globalRender(store.getState())

store.subscribe(() => {
    let state = store.getState()
    globalRender(state)
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



