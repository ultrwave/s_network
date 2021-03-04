import React from 'react';
import {LoginReduxForm} from './LoginForm';
import {connect} from 'react-redux';
import {loginThunk, logoutThunk} from '../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {StateType} from '../types/types';

type LoginPropsType = {
    loginThunk(email: string, password: string, rememberMe: boolean, captcha?: string): void
    logoutThunk(): void
    isAuth: boolean
}

type FormDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

 function Login (props: LoginPropsType) {
    const onSubmit = (formData: FormDataType) => { // todo - fix any
        props.loginThunk(formData.email, formData.password, !!formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div style={{margin: '50px'}}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
})

export default connect(mapStateToProps, {
    loginThunk,
    logoutThunk
})(Login)

