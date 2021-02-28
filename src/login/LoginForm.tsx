import React from 'react';
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import {TextInputForm} from '../components/common/FormsControls/FormsControls';
import {required} from '../utils/validators/validators';

type loginFormPropsType = {
    login: string
    password: string
    rememberMe: string
    handleSubmit: SubmitHandler
}

export const LoginForm: React.FC<InjectedFormProps<loginFormPropsType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'}
                       name={'login'}
                       component={TextInputForm}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={'Password'}
                       name={'password'}
                       component={TextInputForm}
                       validate={[required]}
                />
            </div>
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

export const LoginReduxForm = reduxForm<loginFormPropsType>({
    form: 'login'
})(LoginForm)