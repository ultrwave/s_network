import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {StateType} from '../../types/types';
import {setAuthThunk, setAuthUserData} from '../../redux/auth-reducer';
import {appAPI} from '../../api/api';

type HeaderContainerPropsType = {
    setAuth(): void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.setAuth()
    }


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

export default connect(mapStateToProps, {setAuth: setAuthThunk })(HeaderContainer)