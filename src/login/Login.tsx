import React from 'react';
import {LoginReduxForm} from './LoginForm';


 function Login () {

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

export default Login

