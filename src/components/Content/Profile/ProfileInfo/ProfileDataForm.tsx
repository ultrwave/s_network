import React from 'react';
import {StateType, UserProfileType} from '../../../../types/types';
import Style from '../Profile.module.css';
import {createField, TextInputForm} from '../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const ProfileDataForm = (props: InjectedFormProps<UserProfileType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={Style.editModeItem}>
                <span><b>{`Full name: `}</b></span>
                {createField('Name', 'fullName', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span><b>{`About me: `}</b></span>
                {createField('About me', 'aboutMe', [], TextInputForm)}
            </div>
            <div className={`${Style.editModeItem} ${Style.lookingForAJobCheckbox}`}>
                <span><b>{`Looking for a job: `}</b></span>
                {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            </div>
            <div className={Style.editModeItem}>
                <span><b>{`Skills description: `}</b></span>
                {createField('', 'lookingForAJobDescription', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <div className={Style.editModeContactsSection}>
                <span><b>{`Contacts: `}</b></span>
                {Object.keys(props.initialValues.contacts || {})
                    .sort().map((contactItem, i) => {
                    return <div className={Style.editModeItem} key={i}>
                        <span>{contactItem} :</span>
                        {createField(contactItem, 'contacts.' + contactItem, [], TextInputForm)}
                    </div>
                })}
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
const ProfileDataFormReduxForm = reduxForm<UserProfileType>({form: 'edit-profile'})(ProfileDataForm)

const InitializeFromStateForm = connect(
    (state: StateType) => (
        {initialValues: state.pageProfile.profile}),
    {}
)(ProfileDataFormReduxForm)


export default InitializeFromStateForm