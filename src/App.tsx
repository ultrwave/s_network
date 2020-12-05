import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Content/Profile/Profile';
import {Dialogs} from './components/Content/Dialogs/Dialogs';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import {DialogItemDataType, MessagesDataType, PostsDataType} from './index';

type AppPropsType = {
    dialogItemData: Array<DialogItemDataType>
    messagesData: Array<MessagesDataType>
    postsData: Array<PostsDataType>
}

function App(props: AppPropsType) {

    const dialogsData = {
        dialogItemData: props.dialogItemData,
        messagesData: props.messagesData
    }

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs data={dialogsData}/>}/>
                    <Route path='/profile' render={() => <Profile data={props.postsData}/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
