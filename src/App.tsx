import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Content/Profile/Profile';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import {DialogsContainer} from './components/Content/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';

function App() {

    const dialogs = <Route path='/dialogs' render={() => <DialogsContainer/>}/>

    const profile = <Route path='/profile' render={() => <Profile/>}/>

    const users = <Route path='/users' render={() => <UsersContainer/>}/>

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
                    {users}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
