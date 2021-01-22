import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {StateType} from '../../types/types';
import {setAuthUserData} from '../../redux/auth-reducer';

type HeaderContainerPropsType = { // todo - как типизировать?

}

class HeaderContainer extends React.Component<any> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data; // todo - несовпадаюшие свойства пропадут?
                    this.props.setAuthUserData(id, email, login)
                }
            })
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