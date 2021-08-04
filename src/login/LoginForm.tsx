import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {TextInputForm} from '../components/common/FormsControls/FormsControls';
import {required} from '../utils/validators/validators';
import {connect} from 'react-redux';
import {StateType} from '../types/types';

type loginFormPropsType = {
    captcha: string | undefined | null
}

export const LoginForm = (props: InjectedFormProps<loginFormPropsType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'}
                       name={'email'}
                       component={TextInputForm}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       name={'password'}
                       type={'password'}
                       component={TextInputForm}
                       validate={[required]}
                />
            </div>
            {props.error && <div style={{color: 'red', fontWeight: 'bold'}}>
                {props.error}
            </div>}
            {props.initialValues.captcha &&
            <div>
                <img src={props.initialValues.captcha} alt={'captcha'}/>
                <Field placeholder={'Type symbols from image'}
                       name={'captcha'}
                       component={TextInputForm}
                />
            </div>
            }
            <div>
                <Field type={'checkbox'}
                       name={'rememberMe'}
                       component={'input'}
                />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm
    < loginFormPropsType > ({form: 'login'})(LoginForm)

export const LoginReduxFormWithCaptcha = connect(
    (state: StateType) => (
        {initialValues: {captcha: state.auth.captcha}}),
    {}
)(LoginReduxForm)


