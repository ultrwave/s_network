import React from 'react';
import Style from '../Profile.module.css';
import {Preloader} from '../../../common/Preloader/Preloader';
import {UserProfileType} from '../../../../types/types';
import avatarPlaceholder from '../../../../assets/images/profile_avatar_placeholder.jpg'


type ProfileInfoProps = {
    profile: UserProfileType | null

}

export function ProfileInfo(props: ProfileInfoProps) {

    if (!props.profile) {
        return <Preloader/>
    }

    const userAvatarSrc: string = props.profile.photos.large ? props.profile.photos.large : avatarPlaceholder

    const contacts = Object.entries(props.profile.contacts).map(contact => {
        if (contact[1]) {
            return <div><span>{contact.join(': ')}</span></div>
        }
    })

    return (
        <div>
            <div>
                <img src="http://www.imageonemri.ca/image/w2000-c5:2/files/58532088_l.jpg" alt=""
                     className={Style.profileImg}/>
            </div>
            <div className={Style.description}>
                <img className={Style.userAvatar} src={userAvatarSrc} alt="User avatar"/>
                <div className={Style.profileInfo}>
                    <div className={Style.fullName}>{props.profile.fullName}</div>
                    <div className={Style.aboutMe}>{props.profile.aboutMe}</div>
                    <div className={Style.lookingForAJob}>{props.profile.lookingForAJobDescription}</div>
                    <div className={Style.contacts}>{contacts}</div>
                </div>
            </div>
        </div>
    )
}


