import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import Style from './MyPosts.module.css';
import React from 'react';
import {required, setMaxLength} from '../../../../utils/validators/validators';
import {TextInputForm} from '../../../common/FormsControls/FormsControls';

export type MyPostsMessagePropsType = {
    handleSubmit: SubmitHandler
}

type FormDataType = {
    message: string
}

const maxLength = setMaxLength(10)

export const MyPostsForm = (props: InjectedFormProps<FormDataType & MyPostsMessagePropsType>) => (

    <div className={Style.addPostSection}>
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'What\'s new?'}
                   name={'message'}
                   component={TextInputForm}
                   formType={'textarea'}
                   className={Style.text}
                   validate={[required, maxLength]}

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