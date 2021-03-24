import React from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import {UsersContainer} from './components/Users/UsersContainer';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './login/Login';
import {connect} from 'react-redux';
import {setAuthThunk} from './redux/auth-reducer';
import {compose} from 'redux';

type AppPropsType = {
    setAuth(): void
}

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.setAuth()
    }

    render() {
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>

        );
    }
}

export default compose(
    withRouter,
    connect(null, {setAuth: setAuthThunk}))(App) as React.ComponentType
;
