import React from 'react';
import {StateType, UserProfileType} from '../../../../types/types';
import Style from '../Profile.module.css';
import {createField, TextInputForm} from '../../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const ProfileDataForm = (props: InjectedFormProps<UserProfileType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={Style.BLANK}>{`Full name: `}
                {createField('Name', 'fullName', [], TextInputForm)}
            </div>
            <div className={Style.BLANK}>{`About me: `}
                {createField('About me', 'aboutMe', [], TextInputForm)}
            </div>
            <div className={Style.BLANK}>{`Looking for a job: `}
                {createField('', 'lookingForAJob', [], TextInputForm, {type: 'checkbox'})}
            </div>
            <div className={Style.BLANK}>{`Skills description: `}
                {createField('', 'lookingForAJobDescription', [], TextInputForm, {formType: 'textarea'})}
            </div>
            <div className={Style.BLANK}>{`Contacts: `}
                {createField('Facebook', 'contacts.facebook', [], TextInputForm)}
            </div>
            <button className={Style.BLANK} type='submit'>save changes</button>
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