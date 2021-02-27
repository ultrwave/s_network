import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import Style from './MyPosts.module.css';
import React from 'react';

export type MyPostsMessagePropsType = {
    handleSubmit: SubmitHandler
}

type FormDataType = {
    message: string
}

export const MyPostsForm = (props: InjectedFormProps<FormDataType & MyPostsMessagePropsType>) => (

    <div className={Style.addPostSection}>
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={''}
                   name={'message'}
                   component={'textarea'}
                   className={Style.text}
            />
            <button className={Style.postButton}>
                Send new post
            </button>
        </form>
    </div>
)


export const MyPostsReduxForm = reduxForm<FormDataType & MyPostsMessagePropsType>({
    form: 'myPostsMessage',
})(MyPostsForm)