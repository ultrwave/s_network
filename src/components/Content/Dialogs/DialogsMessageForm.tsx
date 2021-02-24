import React, {createRef, RefObject} from 'react';
import Style from './Dialogs.module.css';
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';

export type DialogsMessagePropsType = {
    handleSubmit: SubmitHandler
}

type FormDataType = { // obsolete
    message: string
    sendAsFriend: boolean
}

export const DialogsMessageForm = (props: InjectedFormProps<FormDataType & DialogsMessagePropsType>) => {

    return (
        <div className={Style.addMessageSection}>

            <form onSubmit={props.handleSubmit}>
                <Field placeholder={''}
                       name={'message'}
                       component={'textarea'}
                       className={Style.text}
                       autoFocus={true}
                />
                <button>
                    Send
                </button>
                <Field type={'checkbox'}
                       name={'sendAsFriend'}
                       component={'input'}
                />
                <span>send as friend</span>
            </form>
        </div>
    )
}

export const DialogsMessageReduxForm = reduxForm<FormDataType & DialogsMessagePropsType>({
    form: 'dialogsMessage',
})(DialogsMessageForm)