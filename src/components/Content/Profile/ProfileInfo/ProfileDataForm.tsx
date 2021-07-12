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

    return (
        <form className={Style.profileInfo} onSubmit={props.handleSubmit}>
            <button type='submit'>save changes</button>
            <div className={Style.fullName}>{`Full name: `}
            {createField('Name', 'fullName', [], TextInputForm)}
            </div>
            <div className={Style.aboutMe}>{`about: `}
            {createField('About me', 'aboutMe', [], TextInputForm)}
            </div>
            <div className={Style.lookingForAJob}>{`Looking for a job: `}
            {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            </div>
            <div className={Style.mySkills}>{`My skills: `}
            {createField('', 'LookingForAJobDescription', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <div className={Style.contacts}>Contacts:
            % to be added %
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