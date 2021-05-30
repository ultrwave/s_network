import React from 'react';
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import {TextInputForm} from '../components/common/FormsControls/FormsControls';
import {required} from '../utils/validators/validators';

type loginFormPropsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha: string
    handleSubmit: SubmitHandler
}

export const LoginForm: React.FC<InjectedFormProps<loginFormPropsType>> = ({handleSubmit, error}) => {

    return (
        <form onSubmit={handleSubmit}>
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
            { error && <div style={{color: 'red',fontWeight: 'bold'}}>
                {error}
            </div>}
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
        form: 'login',
        // initialValues: {captcha: props.captchaMSTP}
    }
)(LoginForm)