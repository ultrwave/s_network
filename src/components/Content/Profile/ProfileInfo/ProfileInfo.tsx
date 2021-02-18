import React from 'react';
import Style from '../Profile.module.css';
import {Preloader} from '../../../common/Preloader/Preloader';
import {UserProfileType} from '../../../../types/types';
import avatarPlaceholder from '../../../../assets/images/profile_avatar_placeholder.jpg'
import profileWallpaper from '../../../../assets/images/wallpaper_01.jpg'
import {ProfileStatus} from './ProfileStatus';


type ProfileInfoProps = {
    profile: UserProfileType | null

}

export function ProfileInfo(props: ProfileInfoProps) {

    if (!props.profile) {
        return <Preloader/>
    }

    const userAvatarSrc: string = props.profile.photos.large ? props.profile.photos.large : avatarPlaceholder

    const contacts = Object.entries(props.profile.contacts).map((contact, i) => {
        if (contact[1]) {
            return <div key={i}><span>{contact.join(': ')}</span></div>
        }
    })

    return (
        <div>
            <div>
                <img src={profileWallpaper} alt=""
                     className={Style.profileWallpaper}/>
            </div>
            <div className={Style.description}>
                <img className={Style.userAvatar} src={userAvatarSrc} alt="User avatar"/>
                <div className={Style.profileInfo}>
                    <ProfileStatus/>
                    <div className={Style.fullName}>{props.profile.fullName}</div>
                    <div className={Style.aboutMe}>{props.profile.aboutMe}</div>
                    <div className={Style.lookingForAJob}>{props.profile.lookingForAJobDescription}</div>
                    <div className={Style.contacts}>{contacts}</div>
                </div>
            </div>
        </div>
    )
}


