import React from 'react';
import {LoginReduxFormWithCaptcha} from './LoginForm';
import {connect} from 'react-redux';
import {loginThunk, logoutThunk} from '../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {StateType} from '../types/types';

type LoginPropsType = {
    loginThunk(email: string, password: string, rememberMe: boolean, captcha?: string): void
    logoutThunk(): void
    isAuth: boolean
    captcha?: string
}

type FormDataType = {
    email: string
    password: string
    rememberMe?: boolean
}

 function Login ({loginThunk, isAuth, captcha}: LoginPropsType) {
    const onSubmit = (formData: FormDataType & any) => {
        loginThunk(formData.email, formData.password, !!formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div style={{margin: '50px'}}>
            <h1>LOGIN</h1>
            <LoginReduxFormWithCaptcha onSubmit={onSubmit}/>
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

