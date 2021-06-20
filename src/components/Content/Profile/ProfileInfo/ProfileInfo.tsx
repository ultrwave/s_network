import React, {useState} from 'react';
import Style from '../Profile.module.css';
import {Preloader} from '../../../common/Preloader/Preloader';
import {UserProfileType} from '../../../../types/types';
import avatarPlaceholder from '../../../../assets/images/profile_avatar_placeholder.jpg'
import profileWallpaper from '../../../../assets/images/wallpaper_01.jpg'
import {Contact} from './Contact';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm';


type ProfileInfoProps = {
    profile: UserProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus(status: string): void
    savePhoto(photo: File): void
}


export function ProfileInfo(props: ProfileInfoProps) {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const userAvatarSrc: string = props.profile.photos.large || avatarPlaceholder

    const contacts = Object.entries(props.profile.contacts).map((contact, i) => {
        if (contact[1]) {
            return <div className={Style.contact} key={i}>
                <Contact contactTitle={contact[0]} contactValue={contact[1]}/>
            </div>
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
                {editMode
                    ? <ProfileData profile={props.profile}
                                 status={props.status}
                                 isOwner={props.isOwner}
                                 contacts={contacts}
                                 updateUserStatus={props.updateUserStatus}
                                 onMainPhotoSelected={onMainPhotoSelected}
                    />
                    : <ProfileDataForm

                    />
                }
            </div>
        </div>
    )
}

