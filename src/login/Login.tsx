import React from 'react';
import {LoginReduxForm} from './LoginForm';


export function Login () {

    const onSubmit = (formData: any) => { // todo - fix any
        console.log(formData)
    }

    return (
        <div style={{margin: '50px'}}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

