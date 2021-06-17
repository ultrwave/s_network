import React from 'react';
import Style from '../Profile.module.css';
import {Preloader} from '../../../common/Preloader/Preloader';
import {UserProfileType} from '../../../../types/types';
import avatarPlaceholder from '../../../../assets/images/profile_avatar_placeholder.jpg'
import profileWallpaper from '../../../../assets/images/wallpaper_01.jpg'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';


type ProfileInfoProps = {
    profile: UserProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus(status: string): void
    savePhoto(photo: File): void
}


export function ProfileInfo(props: ProfileInfoProps) {

    if (!props.profile) {
        return <Preloader/>
    }

    const userAvatarSrc: string = props.profile.photos.large || avatarPlaceholder

    const contacts = Object.entries(props.profile.contacts).map((contact, i) => {
        if (contact[1]) {
            return <div key={i}><span>{contact.join(': ')}</span></div>
        } else {
            return null
        }
    })

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img src={profileWallpaper} alt=""
                     className={Style.profileWallpaper}/>
            </div>
            <div className={Style.description}>
                <img className={Style.userAvatar} src={userAvatarSrc} alt="User avatar"/>
                <div className={Style.profileInfo}>
                    <div className={Style.fullName}>{props.profile.fullName}</div>
                    <div className={Style.aboutMe}>{props.profile.aboutMe}</div>
                    <div className={Style.lookingForAJob}>
                        {`Looking for a job: ${props.profile.lookingForAJob ? 'yes' : 'no'}`}</div>
                    {props.profile.lookingForAJob &&
                    <div className={Style.lookingForAJob}>{props.profile.lookingForAJobDescription}</div>}
                    <ProfileStatusWithHooks
                        status={props.status}
                        updateUserStatus={props.updateUserStatus}
                    />
                    <div className={Style.contacts}>{contacts}</div>
                </div>
            </div>
            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
        </div>
    )
}


