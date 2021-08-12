import React from 'react';
import Style from '../../Profile.module.css';
import {createField, TextInputForm} from '../../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';

const EditPostForm = (props: InjectedFormProps) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField('', 'postMessage', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <button className={`${Style.editModeItem} ${Style.editModeSubmitButton}`} type='submit'>
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