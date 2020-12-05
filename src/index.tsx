import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//======== TYPES ======================================================

export type DialogItemDataType = {
    id: number
    name: string
}

export type MessagesDataType = {
    id: number
    message: string
}

export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}

//======== DATA ======================================================

const dialogItemData: Array<DialogItemDataType> = [
    {id: 1, name: 'Jane'},
    {id: 2, name: 'Tom'},
    {id: 3, name: 'Steve'},
    {id: 4, name: 'Jack'},
    {id: 5, name: 'Anna'}
]

const messagesData: Array<MessagesDataType> = [
    {id: 1, message: 'Hi!'},
    {id: 2, message: 'Hello!'},
    {id: 3, message: 'Whats up?'},
    {id: 4, message: 'Good day!'},
    {id: 5, message: 'Yo!'}
]

const postsData: Array<PostsDataType> = [
    {id: 1, message: 'It\'s my first post!', likesCount: 12},
    {id: 2, message: 'Hello!', likesCount: 432},
    {id: 3, message: 'Good day!', likesCount: 2}
]

//====================================================================

ReactDOM.render(
  <React.StrictMode>
    <App dialogItemData={dialogItemData} messagesData={messagesData} postsData={postsData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



