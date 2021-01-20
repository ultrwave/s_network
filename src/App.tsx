import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import {DialogsContainer} from './components/Content/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import {ProfileContainer} from './components/Content/Profile/ProfileContainer';

function App() {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
