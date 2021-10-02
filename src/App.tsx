import React, {Suspense} from 'react';
import {HashRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {News} from './components/Content/News/News';
import {Music} from './components/Content/Music/Music';
import {Settings} from './components/Content/Settings/Settings';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './login/Login';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import {compose} from 'redux';
import {StateType} from './types/types';
import {Preloader} from './components/common/Preloader/Preloader';
import store from './redux/redux-store';

const DialogsContainer = React.lazy(
    () => import('./components/Content/Dialogs/DialogsContainer'))

const UsersContainer = React.lazy(
    () => import('./components/Users/UsersContainer'))


type AppPropsType = {
    initialized: boolean
    initializeApp(): void
}

class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
        console.warn("unhandled promise rejection" + event.reason)
        alert(event.reason)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">

                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                            <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                            <Route path="/users" render={() => <UsersContainer/>}/>
                            <Route path="/news" component={News}/>
                            <Route path="/music" component={Music}/>
                            <Route path="/settings" component={Settings}/>

                            <Route path={'/404'} render={() => <h1>404 not found</h1>}/>
                            <Redirect from={'*'} to={'/404'}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>

        );
    }
}

const MSTP = (state: StateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(MSTP, {initializeApp}))(App) as React.ComponentType
;

const AppMain = () => {
    return <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default AppMain