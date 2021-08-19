import React from 'react';
import Style from './Post.module.css'
import {createField, TextInputForm} from '../../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';

const EditPostForm = (props: InjectedFormProps) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={Style.editTextArea}>
                {createField('', 'postMessage', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <button className={Style.editSaveButton} type='submit'>
                save changes
            </button>
            {props.error && <div style={{color: 'red',fontWeight: 'bold'}}>
                {props.error}
            </div>}
        </form>
    )
}

const EditPostReduxForm = reduxForm({form: 'edit-post'})(EditPostForm)

export default EditPostReduxForm