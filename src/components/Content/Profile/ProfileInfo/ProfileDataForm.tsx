import React from 'react';
import {StateType, UserProfileType} from '../../../../types/types';
import Style from '../Profile.module.css';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {createField, TextInputForm} from '../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import {connect} from 'react-redux';

type ProfileDataFormPropsType = {
    profile: UserProfileType
    handleSubmit: SubmitHandler
    isOwner: boolean
    setEditModeOff(): void
    updateUserStatus(status: string): void
    onMainPhotoSelected(e: React.ChangeEvent<HTMLInputElement>): void
}


const ProfileDataForm = (props: InjectedFormProps & ProfileDataFormPropsType) => {
    console.log(props)

    return (
        <form className={Style.profileInfo} onSubmit={props.handleSubmit}>
            <button onClick={() => {}}>save changes</button>
            <div className={Style.fullName}>{`Full name: `}</div>
            {createField('your name', 'fullName', [], TextInputForm)}
            <div className={Style.aboutMe}>{`about: `}</div>
            {createField('Full name', 'aboutMe', [], TextInputForm)}
            <div className={Style.lookingForAJob}>{`Looking for a job: `}</div>
            {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            <div className={Style.mySkills}>{`My skills: `}</div>
            {createField('', 'mySkills', [], TextInputForm, {formType: 'textarea'})}
            <ProfileStatusWithHooks
                status={props.profile.aboutMe || ''}
                updateUserStatus={props.updateUserStatus}
            />
            <div className={Style.contacts}>Contacts:

            </div>
            {props.isOwner && <input type="file" onChange={props.onMainPhotoSelected}/>}
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm as any)


const InitializeFromStateForm = connect(
    (state: StateType) => ({
        initialValues: {profile: state.pageProfile.profile}
    }),
    {}
)(ProfileDataFormReduxForm)


export default ProfileDataFormReduxForm