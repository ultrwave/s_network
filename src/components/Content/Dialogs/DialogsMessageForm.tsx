import React from 'react';
import Style from './Dialogs.module.css';
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import {TextInputForm} from '../../common/FormsControls/FormsControls';
import {setMaxLength} from '../../../utils/validators/validators';

export type DialogsMessagePropsType = {
    handleSubmit: SubmitHandler
}

type FormDataType = {
    message: string
    sendAsFriend: boolean
}

const maxLength = setMaxLength(5)

export const DialogsMessageForm = (props: InjectedFormProps<FormDataType & DialogsMessagePropsType>) => {

    return (
        <div className={Style.addMessageSection}>

            <form onSubmit={props.handleSubmit}>
                <Field placeholder={''}
                       component={TextInputForm}
                       formType={'textarea'}
                       validate={[maxLength]}
                       name={'message'}
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
    form: 'dialogsMessage'
})(DialogsMessageForm)