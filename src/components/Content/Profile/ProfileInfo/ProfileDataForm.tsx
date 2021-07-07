import React from 'react';
import {StateType, UserProfileType} from '../../../../types/types';
import Style from '../Profile.module.css';
import {createField, TextInputForm} from '../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

type ProfileDataFormPropsType = {
    profile: UserProfileType
}


const ProfileDataForm = (props: InjectedFormProps<ProfileDataFormPropsType>) => {
    console.log('==== form rendered ====')
    console.log(props)
    console.log('==== ======== ====')

    return (
        <form className={Style.profileInfo} onSubmit={props.handleSubmit}>
            <button type='submit'>save changes</button>
            <div className={Style.fullName}>{`Full name: `}</div>
            {createField('your name', 'fullName', [], TextInputForm)}
            <div className={Style.aboutMe}>{`about: `}</div>
            {createField('Full name', 'aboutMe', [], TextInputForm)}
            <div className={Style.lookingForAJob}>{`Looking for a job: `}</div>
            {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            <div className={Style.mySkills}>{`My skills: `}</div>
            {createField('', 'mySkills', [], TextInputForm, {formType: 'textarea'})}
            <div className={Style.contacts}>Contacts:

            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)


const InitializeFromStateForm = connect(
    (state: StateType) => ({
        initialValues: {profile: state.pageProfile.profile}
    }),
    {}
)(ProfileDataFormReduxForm)


export default InitializeFromStateForm