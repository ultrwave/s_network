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
import {DialogItemType, DialogsDataType, PostsDataType} from './redux/state';

type AppPropsType = {
    state: {
        pageProfile: {
            postsData: Array<PostsDataType>
            newPostText: string
            newPostInput: (t: string) => void
            addPost: (msg: string) => void
        },
        pageDialogs: {
            dialogItems: Array<DialogItemType>
            dialogsData: DialogsDataType
        }
    }
}

function App(props: AppPropsType) {

    const dialogContent = {
        dialogItems: props.state.pageDialogs.dialogItems,
        dialogsData: props.state.pageDialogs.dialogsData
    }

    const dialogs = <Route path='/dialogs' render={() => <Dialogs data={dialogContent}/>}/>

    const profile = <Route path='/profile' render={() => <Profile
        data={props.state.pageProfile.postsData}
        addPost={props.state.pageProfile.addPost}
        newPostInput={props.state.pageProfile.newPostInput}
        newPostText={props.state.pageProfile.newPostText}
    />
    }/>

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {dialogs}
                    {profile}
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
