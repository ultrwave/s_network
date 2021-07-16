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
                <span>{`Full name: `}</span>
                {createField('Name', 'fullName', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span>{`About me: `}</span>
                {createField('About me', 'aboutMe', [], TextInputForm)}
            </div>
            <div className={`${Style.editModeItem} ${Style.lookingForAJobCheckbox}`}>
                <span>{`Looking for a job: `}</span>
                {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            </div>
            <div className={Style.editModeItem}>
                <span>{`Skills description: `}</span>
                {createField('', 'lookingForAJobDescription', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <div className={Style.editModeItem}>
                <span>{`Contacts: `}</span>
                {createField('Facebook', 'contacts.facebook', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('VK', 'contacts.vk', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('Twitter', 'contacts.twitter', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('Instagram', 'contacts.instagram', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('Youtube', 'contacts.youtube', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('Github', 'contacts.github', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('mainLink', 'contacts.mainLink', [], TextInputForm)}
            </div>
            <div className={Style.editModeItem}>
                <span/>
                {createField('Website', 'contacts.website', [], TextInputForm)}
            </div>
            <button className={`${Style.editModeItem} ${Style.editModeSubmitButton}`} type='submit'>
                save changes
            </button>
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