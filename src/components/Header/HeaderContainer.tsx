import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {StateType} from '../../types/types';
import {logoutThunk} from '../../redux/auth-reducer';

export type HeaderContainerPropsType = {
    login: string | null
    isAuth: boolean
    logout(): void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {
    logout: logoutThunk
})(HeaderContainer)