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
            <div className={Style.statusContainer}>
                <ProfileStatusWithHooks
                status={props.status}
                updateUserStatus={props.updateUserStatus}
            />
                <div className={Style.lookingForAJob}>
                    {`${props.profile.lookingForAJob ? 'Looking for a job!' : ''}`}
                </div>
            </div>
            <div className={Style.profileDataContainer}>
                <div className={`${Style.profileInfoSection} ${Style.aboutMe}`}>
                    <span className={Style.profileInfoTitle}>{'About me:'}</span>
                    <div>{props.profile.aboutMe}</div>
                </div>

                <div className={`${Style.profileInfoSection} ${Style.lookingForAJobDescription}`}>
                    <span className={Style.profileInfoTitle}>{'Skills:'}</span>
                    <div>{props.profile.lookingForAJobDescription}</div>
                </div>

                <div className={`${Style.profileInfoSection} ${Style.contacts}`}>
                    <span className={Style.profileInfoTitle}>{'Contacts:'}</span>
                    <div>{props.contacts}</div>
                </div>
            </div>
        </div>
    )
}