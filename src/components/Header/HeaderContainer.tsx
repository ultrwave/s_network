import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType} from '../../types/types';
import {setAuthUserData} from '../../redux/auth-reducer';
import {authMe} from '../../api/api';

type HeaderContainerPropsType = {
    setAuthUserData(userId: number | string | null, // todo - fix type?
                    email: string | null,
                    login: string | null): void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        authMe(this.props.setAuthUserData)
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)