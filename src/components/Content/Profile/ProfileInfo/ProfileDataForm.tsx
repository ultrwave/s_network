import React from 'react';
import {UserProfileType} from '../../../../types/types';
import Style from '../Profile.module.css';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type ProfileDataFormType = {
    profile: UserProfileType
}

export const ProfileDataForm = (profile: ProfileDataFormType) => {
    return (
        <form className={Style.profileInfo}>
            <button onClick={props.setEditModeOff}>save changes</button>
            <div className={Style.fullName}>{props.profile.fullName}</div>
            <div className={Style.aboutMe}>{props.profile.aboutMe}</div>
            <div className={Style.lookingForAJob}>{props.profile.lookingForAJob}</div>
            <div className={Style.lookingForAJob}>{props.profile.lookingForAJobDescription}</div>
            <ProfileStatusWithHooks
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />
            <div className={Style.contacts}>Contacts:
                {props.contacts}
            </div>
            {props.isOwner && <input type="file" onChange={props.onMainPhotoSelected}/>}
        </form>
    )
}

