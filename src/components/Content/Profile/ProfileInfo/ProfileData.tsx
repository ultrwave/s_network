import Style from '../Profile.module.css';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import React from 'react';
import {UserProfileType} from '../../../../types/types';

type ProfileDataProps = {
    profile: UserProfileType
    status: string
    isOwner: boolean
    contacts: Array<JSX.Element | null>
    updateUserStatus(status: string): void
    goToEditMode(): void
    onMainPhotoSelected(e: React.ChangeEvent<HTMLInputElement>): void
}

export const ProfileData = (props: ProfileDataProps) => {

    return (
        <div className={Style.profileInfo}>
            {props.isOwner && <button className={Style.editButton}
                                      onClick={props.goToEditMode}>
                Edit
            </button>}
            <div className={Style.fullName}>{props.profile.fullName}</div>
            <ProfileStatusWithHooks
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />
            <div className={Style.aboutMe}>
                {'About me:'}
                {props.profile.aboutMe}</div>
            <div className={Style.lookingForAJob}>
                {`Looking for a job: ${props.profile.lookingForAJob ? 'yes' : 'no'}`}</div>
            {props.profile.lookingForAJob &&
            <div className={Style.lookingForAJob}>{props.profile.lookingForAJobDescription}</div>}
            <div className={Style.contacts}>Contacts:
                {props.contacts}
            </div>
            {props.isOwner && <input type="file" onChange={props.onMainPhotoSelected}/>}
        </div>
    )
}